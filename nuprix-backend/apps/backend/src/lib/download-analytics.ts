import { createHash } from "crypto"
import { MedusaError } from "@medusajs/framework/utils"

export function hashIpAddress(
  address: string | undefined,
  salt: string | undefined = process.env.DIGITAL_DOWNLOAD_IP_SALT
): string {
  if (!salt) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      "DIGITAL_DOWNLOAD_IP_SALT must be configured before download telemetry is recorded."
    )
  }
  return createHash("sha256")
    .update(`${salt}:${address?.trim() || "unknown"}`)
    .digest("hex")
}

export function normalizeUserAgent(userAgent: string | undefined): string | null {
  return userAgent?.slice(0, 500) || null
}
