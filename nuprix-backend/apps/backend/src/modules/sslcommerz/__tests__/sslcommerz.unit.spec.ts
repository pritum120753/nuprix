import {
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import SslcommerzPaymentProviderService, {
  buildSslcommerzInitPayload,
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
})
