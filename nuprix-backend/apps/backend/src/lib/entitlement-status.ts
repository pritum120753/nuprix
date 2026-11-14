// Pure rules shared by the download route, link regeneration and the
// customer list, so they can never disagree about what "usable" means.

export type EntitlementLike = {
  revoked_at?: Date | string | null
  expires_at?: Date | string | null
  download_count: number
  max_downloads: number
}

export type BlockReason = "revoked" | "expired" | "limit_reached"

export function entitlementBlockReason(
  entitlement: EntitlementLike,
  now: Date = new Date()
): BlockReason | null {
  if (entitlement.revoked_at) {
    return "revoked"
  }
  if (entitlement.expires_at && new Date(entitlement.expires_at) < now) {
    return "expired"
  }
  if (entitlement.download_count >= entitlement.max_downloads) {
    return "limit_reached"
  }
  return null
}
