import type { Logger } from "@medusajs/framework/types"
import {
  AbstractPaymentProvider,
  MedusaError,
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

export type SslcommerzOptions = {
  storeId: string
  storePassword: string
  sandbox?: boolean
  storefrontUrl?: string
  backendUrl?: string
}

type InjectedDependencies = {
  logger: Logger
}

export type SslcommerzValidationResponse = {
  status?: string
  tran_id?: string
  val_id?: string
  amount?: string
  currency?: string
  currency_amount?: string
  currency_type?: string
  bank_tran_id?: string
  risk_level?: string | number
  value_a?: string
  value_b?: string
  value_c?: string
}

export function sslcommerzBaseUrl(sandbox = true): string {
  return sandbox
    ? "https://sandbox.sslcommerz.com"
    : "https://securepay.sslcommerz.com"
}

export function buildSslcommerzTranId(sessionId?: string): string {
  if (typeof sessionId === "string" && sessionId.length > 0) {
    if (sessionId.length <= 30) {
      return sessionId
    }
    const stripped = sessionId.startsWith("payses_")
      ? sessionId.slice("payses_".length)
      : sessionId
    return `npx_${stripped.slice(0, 26)}`
  }
  return `npx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`.slice(
    0,
    30
  )
}

export function extractSslcommerzValId(
  data?: Record<string, unknown>
): string | undefined {
  if (typeof data?.val_id === "string" && data.val_id.length > 0) {
    return data.val_id
  }
  const client = data?.client as Record<string, unknown> | undefined
  if (typeof client?.val_id === "string" && client.val_id.length > 0) {
    return client.val_id
  }
  return undefined
}

function buildSslcommerzReturnUrl(input: {
  storefront: string
  status: "success" | "failed" | "canceled"
  tranId: string
  cartId?: string
  countryCode?: string
}): string {
  const params = new URLSearchParams({
    provider: "sslcommerz",
    status: input.status,
    tran_id: input.tranId,
  })
  if (input.cartId) {
    params.set("cart_id", input.cartId)
  }
  if (input.countryCode) {
    params.set("country_code", input.countryCode)
  }
  return `${input.storefront}/api/payment-return?${params.toString()}`
}

export function buildSslcommerzInitPayload(input: {
  storeId: string
  storePassword: string
  amount: number
  currency: string
  tranId: string
  storefrontUrl: string
  backendUrl: string
  sessionId?: string
  cartId?: string
  countryCode?: string
  customerEmail?: string
  customerName?: string
  customerPhone?: string
}): URLSearchParams {
  const storefront = input.storefrontUrl.replace(/\/$/, "")
  const backend = input.backendUrl.replace(/\/$/, "")

  const params = new URLSearchParams({
    store_id: input.storeId,
    store_passwd: input.storePassword,
    total_amount: String(Number(input.amount).toFixed(2)),
    currency: input.currency.toUpperCase(),
    tran_id: input.tranId,
    success_url: buildSslcommerzReturnUrl({
      storefront,
      status: "success",
      tranId: input.tranId,
      cartId: input.cartId,
      countryCode: input.countryCode,
    }),
    fail_url: buildSslcommerzReturnUrl({
      storefront,
      status: "failed",
      tranId: input.tranId,
      cartId: input.cartId,
      countryCode: input.countryCode,
    }),
    cancel_url: buildSslcommerzReturnUrl({
      storefront,
      status: "canceled",
      tranId: input.tranId,
      cartId: input.cartId,
      countryCode: input.countryCode,
    }),
    ipn_url: `${backend}/hooks/payment/sslcommerz_sslcommerz`,
    shipping_method: "NO",
    product_name: "Nuprix Order",
    product_category: "Marketplace",
    product_profile: "general",
    cus_name: input.customerName || "Nuprix Customer",
    cus_email: input.customerEmail || "customer@nuprix.local",
    cus_add1: "N/A",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: input.customerPhone || "0000000000",
  })

  if (input.sessionId) {
    params.set("value_a", input.sessionId)
  }
  if (input.cartId) {
    params.set("value_b", input.cartId)
  }
  if (input.countryCode) {
    params.set("value_c", input.countryCode)
  }

  return params
}

export function mapSslcommerzStatus(
  status?: string | null
): PaymentSessionStatus {
  const upper = status?.toUpperCase()
  if (upper === "VALID" || upper === "VALIDATED") {
    return PaymentSessionStatus.CAPTURED
  }
  if (upper === "CANCELLED" || upper === "CANCELED") {
    return PaymentSessionStatus.CANCELED
  }
  if (upper === "FAILED" || upper === "INVALID_TRANSACTION") {
    return PaymentSessionStatus.ERROR
  }
  return PaymentSessionStatus.PENDING
}

export function verifySslcommerzValidation(input: {
  validation: SslcommerzValidationResponse
  expectedTranId?: string
  expectedAmount?: number
  expectedCurrency?: string
}): { valid: boolean; reason?: string } {
  if (mapSslcommerzStatus(input.validation.status) !== PaymentSessionStatus.CAPTURED) {
    return { valid: false, reason: "Transaction not validated" }
  }

  if (
    input.validation.risk_level !== undefined &&
    input.validation.risk_level !== null &&
    String(input.validation.risk_level) !== "0"
  ) {
    return { valid: false, reason: "Transaction flagged as high risk" }
  }

  if (input.expectedTranId && input.validation.tran_id !== input.expectedTranId) {
    return { valid: false, reason: "Transaction ID mismatch" }
  }

  if (
    typeof input.expectedAmount === "number" &&
    Number.isFinite(input.expectedAmount)
  ) {
    const validatedAmount = Number(
      input.validation.currency_amount ?? input.validation.amount
    )
    if (
      !Number.isFinite(validatedAmount) ||
      Math.abs(validatedAmount - input.expectedAmount) > 0.01
    ) {
      return { valid: false, reason: "Amount mismatch" }
    }
  }

  if (input.expectedCurrency) {
    const validatedCurrency = (
      input.validation.currency_type ?? input.validation.currency
    )?.toUpperCase()
    if (
      !validatedCurrency ||
      validatedCurrency !== input.expectedCurrency.toUpperCase()
    ) {
      return { valid: false, reason: "Currency mismatch" }
    }
  }

  return { valid: true }
}

class SslcommerzPaymentProviderService extends AbstractPaymentProvider<SslcommerzOptions> {
  static identifier = "sslcommerz"

  protected options_: SslcommerzOptions
  protected logger_: Logger

  constructor(
    { logger }: InjectedDependencies,
    options: SslcommerzOptions
  ) {
    super({ logger }, options)
    this.logger_ = logger
    this.options_ = options
  }

  static validateOptions(options: Record<string, unknown>) {
    if (!options.storeId || typeof options.storeId !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `storeId` is required in SSLCommerz provider options."
      )
    }
    if (!options.storePassword || typeof options.storePassword !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `storePassword` is required in SSLCommerz provider options."
      )
    }
  }

  protected baseUrl(): string {
    return sslcommerzBaseUrl(this.options_.sandbox !== false)
  }

  protected async validateWithSslcommerz(
    valId: string
  ): Promise<SslcommerzValidationResponse> {
    const url = new URL(
      `${this.baseUrl()}/validator/api/validationserverAPI.php`
    )
    url.searchParams.set("val_id", valId)
    url.searchParams.set("store_id", this.options_.storeId)
    url.searchParams.set("store_passwd", this.options_.storePassword)
    url.searchParams.set("v", "1")
    url.searchParams.set("format", "json")

    const response = await fetch(url.toString(), { method: "GET" })
    if (!response.ok) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `SSLCommerz validation failed (${response.status})`
      )
    }
    return (await response.json()) as SslcommerzValidationResponse
  }

  protected resolveExpectedValidationParams(data?: Record<string, unknown>): {
    expectedTranId?: string
    expectedAmount?: number
    expectedCurrency?: string
  } {
    const rawAmount = data?.amount
    const parsedAmount =
      typeof rawAmount === "number"
        ? rawAmount
        : typeof rawAmount === "string" && rawAmount.length > 0
          ? Number(rawAmount)
          : undefined

    return {
      expectedTranId:
        typeof data?.tran_id === "string" && data.tran_id.length > 0
          ? data.tran_id
          : undefined,
      expectedAmount:
        parsedAmount !== undefined && Number.isFinite(parsedAmount)
          ? parsedAmount
          : undefined,
      expectedCurrency:
        typeof data?.currency_code === "string" && data.currency_code.length > 0
          ? data.currency_code
          : undefined,
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const sessionId =
      typeof input.data?.session_id === "string" && input.data.session_id
        ? input.data.session_id
        : undefined
    const tranId = buildSslcommerzTranId(sessionId)
    const cartId =
      typeof input.data?.cart_id === "string" && input.data.cart_id
        ? input.data.cart_id
        : undefined
    const countryCode =
      typeof input.data?.country_code === "string" && input.data.country_code
        ? input.data.country_code
        : undefined
    const customerEmail =
      input.context?.customer?.email ||
      (typeof input.data?.customer_email === "string" &&
      input.data.customer_email
        ? input.data.customer_email
        : undefined)
    const contextName = [
      input.context?.customer?.first_name,
      input.context?.customer?.last_name,
    ]
      .filter(Boolean)
      .join(" ")
    const customerName =
      contextName ||
      (typeof input.data?.customer_name === "string" && input.data.customer_name
        ? input.data.customer_name
        : undefined)
    const customerPhone =
      input.context?.customer?.phone ||
      (typeof input.data?.customer_phone === "string" &&
      input.data.customer_phone
        ? input.data.customer_phone
        : undefined)

    const payload = buildSslcommerzInitPayload({
      storeId: this.options_.storeId,
      storePassword: this.options_.storePassword,
      amount: Number(input.amount),
      currency: input.currency_code,
      tranId,
      storefrontUrl:
        this.options_.storefrontUrl ||
        process.env.STOREFRONT_URL ||
        "http://localhost:8000",
      backendUrl:
        this.options_.backendUrl ||
        process.env.DOWNLOAD_BASE_URL ||
        "http://localhost:9000",
      sessionId,
      cartId,
      countryCode,
      customerEmail,
      customerName,
      customerPhone,
    })

    const response = await fetch(
      `${this.baseUrl()}/gwprocess/v4/api.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      }
    )

    const result = (await response.json()) as {
      status?: string
      failedreason?: string
      sessionkey?: string
      GatewayPageURL?: string
    }

    if (!response.ok || result.status !== "SUCCESS" || !result.GatewayPageURL) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        result.failedreason || "Failed to initiate SSLCommerz session."
      )
    }

    return {
      id: tranId,
      data: {
        tran_id: tranId,
        session_id: sessionId ?? null,
        cart_id: cartId ?? null,
        country_code: countryCode ?? null,
        sessionkey: result.sessionkey ?? null,
        gateway_url: result.GatewayPageURL,
        amount: Number(input.amount),
        currency_code: input.currency_code,
      },
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const valId = extractSslcommerzValId(input.data)
    if (!valId) {
      return {
        status: PaymentSessionStatus.PENDING,
        data: input.data ?? {},
      }
    }

    const validation = await this.validateWithSslcommerz(valId)
    const rawStatus = mapSslcommerzStatus(validation.status)
    if (rawStatus === PaymentSessionStatus.CAPTURED) {
      const check = verifySslcommerzValidation({
        validation,
        ...this.resolveExpectedValidationParams(input.data),
      })
      if (!check.valid) {
        this.logger_.warn(
          `SSLCommerz validation mismatch during authorizePayment (val_id=${valId}): ${check.reason}`
        )
        return {
          status: PaymentSessionStatus.ERROR,
          data: {
            ...(input.data ?? {}),
            ...validation,
            validation_error: check.reason,
          },
        }
      }
    }

    return {
      status: rawStatus,
      data: {
        ...(input.data ?? {}),
        ...validation,
      },
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const valId = extractSslcommerzValId(input.data)
    if (!valId) {
      return { data: input.data ?? {} }
    }
    const validation = await this.validateWithSslcommerz(valId)
    return {
      data: {
        ...(input.data ?? {}),
        ...validation,
      },
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    const bankTranId =
      typeof input.data?.bank_tran_id === "string"
        ? input.data.bank_tran_id
        : undefined
    if (!bankTranId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Cannot refund SSLCommerz payment without bank_tran_id."
      )
    }

    const url = new URL(
      `${this.baseUrl()}/validator/api/merchantTransIDvalidationAPI.php`
    )
    url.searchParams.set("refund_amount", String(Number(input.amount).toFixed(2)))
    url.searchParams.set("refund_remarks", "Nuprix refund")
    url.searchParams.set("bank_tran_id", bankTranId)
    url.searchParams.set("store_id", this.options_.storeId)
    url.searchParams.set("store_passwd", this.options_.storePassword)
    url.searchParams.set("format", "json")

    const response = await fetch(url.toString(), { method: "GET" })
    const result = (await response.json()) as Record<string, unknown>

    if (!response.ok) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "SSLCommerz refund request failed."
      )
    }

    return {
      data: {
        ...(input.data ?? {}),
        refund: result,
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: input.data ?? {} }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data ?? {} }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const valId = extractSslcommerzValId(input.data)
    if (!valId) {
      return { status: PaymentSessionStatus.PENDING }
    }
    const validation = await this.validateWithSslcommerz(valId)
    const rawStatus = mapSslcommerzStatus(validation.status)
    if (rawStatus === PaymentSessionStatus.CAPTURED) {
      const check = verifySslcommerzValidation({
        validation,
        ...this.resolveExpectedValidationParams(input.data),
      })
      if (!check.valid) {
        this.logger_.warn(
          `SSLCommerz validation mismatch during getPaymentStatus (val_id=${valId}): ${check.reason}`
        )
        return {
          status: PaymentSessionStatus.ERROR,
          data: {
            ...(input.data ?? {}),
            ...validation,
            validation_error: check.reason,
          },
        }
      }
    }

    return {
      status: rawStatus,
      data: {
        ...(input.data ?? {}),
        ...validation,
      },
    }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    return { data: input.data ?? {} }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: input.data ?? {} }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const body = payload.data as Record<string, unknown>
    const valId = typeof body?.val_id === "string" ? body.val_id : undefined
    const tranId = typeof body?.tran_id === "string" ? body.tran_id : ""

    if (!valId || !tranId) {
      return { action: PaymentActions.NOT_SUPPORTED }
    }

    const validation = await this.validateWithSslcommerz(valId)
    const sessionId =
      (typeof validation.value_a === "string" && validation.value_a) ||
      (typeof body?.value_a === "string" && body.value_a) ||
      tranId
    const status = mapSslcommerzStatus(validation.status)
    const amount = Number(
      validation.currency_amount ?? validation.amount ?? body.amount ?? 0
    )

    if (status === PaymentSessionStatus.CAPTURED) {
      const check = verifySslcommerzValidation({
        validation,
        expectedTranId: tranId,
      })
      if (!check.valid) {
        this.logger_.warn(
          `SSLCommerz webhook validation failed (val_id=${valId}): ${check.reason}`
        )
        return {
          action: PaymentActions.FAILED,
          data: { session_id: sessionId, amount },
        }
      }
      return {
        action: PaymentActions.SUCCESSFUL,
        data: { session_id: sessionId, amount },
      }
    }

    if (status === PaymentSessionStatus.CANCELED) {
      return {
        action: PaymentActions.CANCELED,
        data: { session_id: sessionId, amount },
      }
    }

    if (status === PaymentSessionStatus.ERROR) {
      return {
        action: PaymentActions.FAILED,
        data: { session_id: sessionId, amount },
      }
    }

    return { action: PaymentActions.NOT_SUPPORTED }
  }
}

export default SslcommerzPaymentProviderService
