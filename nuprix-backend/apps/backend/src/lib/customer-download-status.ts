import { getPaymentState } from "./order-payment"

export type CustomerDownloadStatus =
  | "available"
  | "awaiting_payment"
  | "refunded"
  | "order_canceled"
  | "unavailable"
  | "expired"
  | "revoked"
  | "limit_reached"

export type DownloadEntitlementStatusInput = {
  revoked_at?: Date | string | null
  expires_at?: Date | string | null
  download_count: number
  max_downloads: number
}

export type DownloadOrderStatusInput = {
  status?: string | null
  total?: unknown
  payment_collections?: Parameters<typeof getPaymentState>[0]
} | null

export function allowsUncapturedDownloads(
  env: NodeJS.ProcessEnv = process.env
): boolean {
  return (
    (env.NODE_ENV === "development" || env.NODE_ENV === "test") &&
    env.DIGITAL_ALLOW_UNCAPTURED === "true"
  )
}

export function resolveDownloadStatus(
  entitlement: DownloadEntitlementStatusInput,
  order: DownloadOrderStatusInput,
  now = new Date(),
  allowUncaptured = allowsUncapturedDownloads()
): CustomerDownloadStatus {
  if (entitlement.revoked_at) {
    return "revoked"
  }
  if (!order) {
    return "unavailable"
  }
  if (order.status === "canceled") {
    return "order_canceled"
  }

  const paymentState = getPaymentState(order.payment_collections, order.total)
  if (paymentState === "refunded") {
    return "refunded"
  }
  if (entitlement.expires_at && new Date(entitlement.expires_at).getTime() <= now.getTime()) {
    return "expired"
  }
  if (entitlement.download_count >= entitlement.max_downloads) {
    return "limit_reached"
  }
  if (paymentState === "paid" || allowUncaptured) {
    return "available"
  }
  return "awaiting_payment"
}
