import { isFullyPaid } from "./order-payment"

export type CustomerDownloadStatus =
  | "available"
  | "pending"
  | "expired"
  | "revoked"
  | "limit_reached"

type EntitlementStatusInput = {
  revoked_at?: Date | string | null
  expires_at?: Date | string | null
  download_count: number
  max_downloads: number
}

type OrderStatusInput = {
  status?: string | null
  payment_collections?: Parameters<typeof isFullyPaid>[0]
} | null

export function getCustomerDownloadStatus(
  entitlement: EntitlementStatusInput,
  order: OrderStatusInput,
  now = new Date()
): CustomerDownloadStatus {
  if (entitlement.revoked_at) {
    return "revoked"
  }
  if (
    entitlement.expires_at &&
    new Date(entitlement.expires_at).getTime() <= now.getTime()
  ) {
    return "expired"
  }
  if (entitlement.download_count >= entitlement.max_downloads) {
    return "limit_reached"
  }
  if (
    !order ||
    order.status === "canceled" ||
    !isFullyPaid(order.payment_collections)
  ) {
    return "pending"
  }
  return "available"
}
