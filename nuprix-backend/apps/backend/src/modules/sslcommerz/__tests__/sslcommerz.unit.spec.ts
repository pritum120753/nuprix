import {
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import SslcommerzPaymentProviderService, {
  buildSslcommerzInitPayload,
  buildSslcommerzTranId,
  mapSslcommerzStatus,
} from "../service"

describe("SslcommerzPaymentProviderService", () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
  })

  it("maps SSLCommerz statuses accurately", () => {
    expect(mapSslcommerzStatus("VALID")).toBe(PaymentSessionStatus.CAPTURED)
    expect(mapSslcommerzStatus("VALIDATED")).toBe(PaymentSessionStatus.CAPTURED)
    expect(mapSslcommerzStatus("FAILED")).toBe(PaymentSessionStatus.ERROR)
    expect(mapSslcommerzStatus("CANCELLED")).toBe(PaymentSessionStatus.CANCELED)
    expect(mapSslcommerzStatus("PENDING")).toBe(PaymentSessionStatus.PENDING)
  })

  it("builds form payload with return and IPN URLs", () => {
    const params = buildSslcommerzInitPayload({
      storeId: "testbox",
      storePassword: "pass",
      amount: 1500,
      currency: "bdt",
      tranId: "npx_123",
      storefrontUrl: "https://nuprix.example/",
      backendUrl: "https://api.nuprix.example/",
      customerEmail: "buyer@example.com",
    })

    expect(params.get("currency")).toBe("BDT")
    expect(params.get("total_amount")).toBe("1500.00")
    expect(params.get("success_url")).toContain(
      "https://nuprix.example/api/payment-return?provider=sslcommerz&status=success&tran_id=npx_123"
    )
    expect(params.get("ipn_url")).toBe(
      "https://api.nuprix.example/hooks/payment/sslcommerz_sslcommerz"
    )
  })

  it("verifies IPN webhooks against the SSLCommerz validation API", async () => {
    global.fetch = jest.fn(async () =>
      new Response(
        JSON.stringify({
          status: "VALID",
          tran_id: "npx_999",
          val_id: "val_abc",
          amount: "2500.00",
        }),
        { status: 200 }
      )
    ) as unknown as typeof fetch

    const provider = new SslcommerzPaymentProviderService(
      { logger: console as never },
      { storeId: "testbox", storePassword: "pass", sandbox: true }
    )

    const result = await provider.getWebhookActionAndData({
      data: { tran_id: "npx_999", val_id: "val_abc" },
      rawData: "",
      headers: {},
    })

    expect(result).toEqual({
      action: PaymentActions.SUCCESSFUL,
      data: { session_id: "npx_999", amount: 2500 },
    })
  })

  it("enforces SSLCommerz 30-char tran_id limit while keeping short IDs", () => {
    expect(buildSslcommerzTranId("npx_short_123")).toBe("npx_short_123")

    const medusaSessionId = "payses_01JEXAMPLE1234567890ABCDEF"
    const tranId = buildSslcommerzTranId(medusaSessionId)
    expect(tranId.length).toBeLessThanOrEqual(30)
    expect(tranId).toBe("npx_01JEXAMPLE1234567890ABCDEF")

    const fallback = buildSslcommerzTranId()
    expect(fallback.length).toBeLessThanOrEqual(30)
    expect(fallback.startsWith("npx_")).toBe(true)
  })

  it("embeds cart_id, country_code, and pass-through values in return URLs and payload", () => {
    const params = buildSslcommerzInitPayload({
      storeId: "testbox",
      storePassword: "pass",
      amount: 1500,
      currency: "bdt",
      tranId: "npx_01JEXAMPLE",
      storefrontUrl: "http://localhost:8000/",
      backendUrl: "http://localhost:9000/",
      sessionId: "payses_01JEXAMPLE1234567890ABCDEF",
      cartId: "cart_01JEXAMPLE",
      countryCode: "bd",
    })

    for (const field of ["success_url", "fail_url", "cancel_url"]) {
      const parsed = new URL(params.get(field)!)
      expect(parsed.searchParams.get("provider")).toBe("sslcommerz")
      expect(parsed.searchParams.get("tran_id")).toBe("npx_01JEXAMPLE")
      expect(parsed.searchParams.get("cart_id")).toBe("cart_01JEXAMPLE")
      expect(parsed.searchParams.get("country_code")).toBe("bd")
    }

    expect(params.get("value_a")).toBe("payses_01JEXAMPLE1234567890ABCDEF")
    expect(params.get("value_b")).toBe("cart_01JEXAMPLE")
    expect(params.get("value_c")).toBe("bd")
  })

  it("authorizes payments when val_id is stored under data.client.val_id", async () => {
    global.fetch = jest.fn(async () =>
      new Response(
        JSON.stringify({
          status: "VALID",
          tran_id: "npx_session_1",
          val_id: "val_client_1",
          amount: "1200.00",
          currency_type: "BDT",
          currency_amount: "1200.00",
          risk_level: "0",
        }),
        { status: 200 }
      )
    ) as unknown as typeof fetch

    const provider = new SslcommerzPaymentProviderService(
      { logger: console as never },
      { storeId: "testbox", storePassword: "pass", sandbox: true }
    )

    const result = await provider.authorizePayment({
      data: {
        tran_id: "npx_session_1",
        amount: 1200,
        currency_code: "bdt",
        client: {
          val_id: "val_client_1",
          tran_id: "npx_session_1",
        },
      },
      context: {},
    })

    expect(result.status).toBe(PaymentSessionStatus.CAPTURED)
    expect(result.data?.val_id).toBe("val_client_1")
  })

  it("rejects tampered or high-risk validations during authorizePayment", async () => {
    const mockLogger = { warn: jest.fn(), info: jest.fn(), error: jest.fn() }
    const provider = new SslcommerzPaymentProviderService(
      { logger: mockLogger as never },
      { storeId: "testbox", storePassword: "pass", sandbox: true }
    )

    const baseSessionData = {
      tran_id: "npx_expected",
      amount: 1500,
      currency_code: "bdt",
      client: { val_id: "val_replay" },
    }

    const tamperedResponses = [
      {
        status: "VALID",
        tran_id: "npx_expected",
        amount: "100.00",
        currency_type: "BDT",
        risk_level: "0",
      },
      {
        status: "VALID",
        tran_id: "npx_other",
        amount: "1500.00",
        currency_type: "BDT",
        risk_level: "0",
      },
      {
        status: "VALID",
        tran_id: "npx_expected",
        amount: "1500.00",
        currency_type: "USD",
        risk_level: "0",
      },
      {
        status: "VALID",
        tran_id: "npx_expected",
        amount: "1500.00",
        currency_type: "BDT",
        risk_level: "1",
      },
    ]

    for (const payload of tamperedResponses) {
      global.fetch = jest.fn(async () =>
        new Response(JSON.stringify(payload), { status: 200 })
      ) as unknown as typeof fetch

      const result = await provider.authorizePayment({
        data: baseSessionData,
        context: {},
      })
      expect(result.status).toBe(PaymentSessionStatus.ERROR)
    }
  })

  it("uses value_a as session_id in webhooks and fails mismatched tran_id or high risk", async () => {
    const mockLogger = { warn: jest.fn(), info: jest.fn(), error: jest.fn() }
    const provider = new SslcommerzPaymentProviderService(
      { logger: mockLogger as never },
      { storeId: "testbox", storePassword: "pass", sandbox: true }
    )

    global.fetch = jest.fn(async () =>
      new Response(
        JSON.stringify({
          status: "VALID",
          tran_id: "npx_short_999",
          val_id: "val_ipn_1",
          amount: "2500.00",
          currency_amount: "2500.00",
          risk_level: "0",
          value_a: "payses_01JEXAMPLE1234567890ABCDEF",
        }),
        { status: 200 }
      )
    ) as unknown as typeof fetch

    const ok = await provider.getWebhookActionAndData({
      data: { tran_id: "npx_short_999", val_id: "val_ipn_1" },
      rawData: "",
      headers: {},
    })
    expect(ok).toEqual({
      action: PaymentActions.SUCCESSFUL,
      data: {
        session_id: "payses_01JEXAMPLE1234567890ABCDEF",
        amount: 2500,
      },
    })

    global.fetch = jest.fn(async () =>
      new Response(
        JSON.stringify({
          status: "VALID",
          tran_id: "npx_other_tran",
          val_id: "val_ipn_2",
          amount: "2500.00",
          risk_level: "1",
          value_a: "payses_01JEXAMPLE1234567890ABCDEF",
        }),
        { status: 200 }
      )
    ) as unknown as typeof fetch

    const rejected = await provider.getWebhookActionAndData({
      data: { tran_id: "npx_short_999", val_id: "val_ipn_2" },
      rawData: "",
      headers: {},
    })
    expect(rejected).toEqual({
      action: PaymentActions.FAILED,
      data: {
        session_id: "payses_01JEXAMPLE1234567890ABCDEF",
        amount: 2500,
      },
    })
  })
})
