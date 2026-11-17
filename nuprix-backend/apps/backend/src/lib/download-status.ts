export type EntitlementStatus =
  | "available"
  | "awaiting_payment"
  | "expired"
  | "revoked"
  | "limit_reached"

export interface EntitlementStatusInput {
  revokedAt?: Date | string | null
  expiresAt?: Date | string | null
  downloadCount: number
  maxDownloads: number
  isOrderPaid?: boolean
  isOrderCanceled?: boolean
  nowMs?: number
}

/**
 * Single source of truth for download entitlement status across listing,
 * regeneration, and token redemption routes.
 *
 * Precedence: revoked / canceled > awaiting_payment > expired > limit_reached > available.
 */
export function resolveEntitlementStatus(
  input: EntitlementStatusInput
): EntitlementStatus {
  if (input.revokedAt || input.isOrderCanceled) {
    return "revoked"
  }

  if (input.isOrderPaid === false) {
    return "awaiting_payment"
  }

  const now = input.nowMs ?? Date.now()
  if (input.expiresAt && new Date(input.expiresAt).getTime() <= now) {
    return "expired"
  }

  if (input.downloadCount >= input.maxDownloads) {
    return "limit_reached"
  }

  return "available"
}
