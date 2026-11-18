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

export function sslcommerzBaseUrl(sandbox = true): string {
  return sandbox
    ? "https://sandbox.sslcommerz.com"
    : "https://securepay.sslcommerz.com"
}

export function buildSslcommerzInitPayload(input: {
  storeId: string
  storePassword: string
  amount: number
  currency: string
  tranId: string
  storefrontUrl: string
  backendUrl: string
  customerEmail?: string
  customerName?: string
}): URLSearchParams {
  const storefront = input.storefrontUrl.replace(/\/$/, "")
  const backend = input.backendUrl.replace(/\/$/, "")

  return new URLSearchParams({
    store_id: input.storeId,
    store_passwd: input.storePassword,
    total_amount: String(Number(input.amount).toFixed(2)),
    currency: input.currency.toUpperCase(),
    tran_id: input.tranId,
    success_url: `${storefront}/api/payment-return?provider=sslcommerz&status=success&tran_id=${encodeURIComponent(
      input.tranId
    )}`,
    fail_url: `${storefront}/api/payment-return?provider=sslcommerz&status=failed&tran_id=${encodeURIComponent(
      input.tranId
    )}`,
    cancel_url: `${storefront}/api/payment-return?provider=sslcommerz&status=canceled&tran_id=${encodeURIComponent(
      input.tranId
    )}`,
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
    cus_phone: "0000000000",
  })
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

  protected async validateWithSslcommerz(valId: string) {
    const url = new URL(
      `${this.baseUrl()}/validator/api/validationserverAPI.php`
    )
    url.searchParams.set("val_id", valId)
    url.searchParams.set("store_id", this.options_.storeId)
    url.searchParams.set("store_passwd", this.options_.storePassword)
    url.searchParams.set("format", "json")

    const response = await fetch(url.toString(), { method: "GET" })
    if (!response.ok) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `SSLCommerz validation failed (${response.status})`
      )
    }
    return (await response.json()) as {
      status?: string
      tran_id?: string
      val_id?: string
      amount?: string
      currency?: string
      bank_tran_id?: string
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const tranId =
      typeof input.data?.session_id === "string" && input.data.session_id
        ? input.data.session_id
        : `npx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

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
      customerEmail: input.context?.customer?.email,
      customerName: [
        input.context?.customer?.first_name,
        input.context?.customer?.last_name,
      ]
        .filter(Boolean)
        .join(" "),
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
        sessionkey: result.sessionkey ?? null,
        gateway_url: result.GatewayPageURL,
        amount: input.amount,
        currency_code: input.currency_code,
      },
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const valId =
      typeof input.data?.val_id === "string" ? input.data.val_id : undefined
    if (!valId) {
      return {
        status: PaymentSessionStatus.PENDING,
        data: input.data ?? {},
      }
    }

    const validation = await this.validateWithSslcommerz(valId)
    return {
      status: mapSslcommerzStatus(validation.status),
      data: {
        ...(input.data ?? {}),
        ...validation,
      },
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const valId =
      typeof input.data?.val_id === "string" ? input.data.val_id : undefined
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
    const valId =
      typeof input.data?.val_id === "string" ? input.data.val_id : undefined
    if (!valId) {
      return { status: PaymentSessionStatus.PENDING }
    }
    const validation = await this.validateWithSslcommerz(valId)
    return {
      status: mapSslcommerzStatus(validation.status),
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
    const status = mapSslcommerzStatus(validation.status)
    const amount = Number(validation.amount ?? body.amount ?? 0)

    if (status === PaymentSessionStatus.CAPTURED) {
      return {
        action: PaymentActions.SUCCESSFUL,
        data: { session_id: tranId, amount },
      }
    }

    if (status === PaymentSessionStatus.CANCELED) {
      return {
        action: PaymentActions.CANCELED,
        data: { session_id: tranId, amount },
      }
    }

    if (status === PaymentSessionStatus.ERROR) {
      return {
        action: PaymentActions.FAILED,
        data: { session_id: tranId, amount },
      }
    }

    return { action: PaymentActions.NOT_SUPPORTED }
  }
}

export default SslcommerzPaymentProviderService
