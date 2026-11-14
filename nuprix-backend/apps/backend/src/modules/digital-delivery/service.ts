import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import { hashDownloadToken, newDownloadToken } from "../../lib/download-token"
import DigitalFile from "./models/digital-file"
import DownloadEntitlement from "./models/download-entitlement"

export type GrantInput = {
  order_id: string
  customer_id?: string | null
  email: string
  digital_file_id: string
  max_downloads: number
  expires_after_days?: number | null
}

export type DownloadCheck =
  | { ok: true; entitlement_id: string; digital_file_id: string }
  | { ok: false; reason: "invalid" | "revoked" | "expired" | "limit_reached" }

class DigitalDeliveryModuleService extends MedusaService({
  DigitalFile,
  DownloadEntitlement,
}) {
  // Creates an entitlement and returns the raw token. The raw token exists
  // only in this return value; it cannot be recovered later.
  async grant(input: GrantInput): Promise<{ id: string; token: string }> {
    if (!input.email) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "An email is required to grant download access"
      )
    }

    const token = newDownloadToken()
    const expires_at = input.expires_after_days
      ? new Date(Date.now() + input.expires_after_days * 24 * 60 * 60 * 1000)
      : null

    const created = await this.createDownloadEntitlements({
      order_id: input.order_id,
      customer_id: input.customer_id ?? null,
      email: input.email,
      digital_file_id: input.digital_file_id,
      token_hash: hashDownloadToken(token),
      max_downloads: input.max_downloads,
      expires_at,
    })

    return { id: created.id, token }
  }

  // Replaces the token of an existing entitlement (for "resend my link").
  async rotateToken(entitlement_id: string): Promise<string> {
    const token = newDownloadToken()
    await this.updateDownloadEntitlements({
      id: entitlement_id,
      token_hash: hashDownloadToken(token),
    })
    return token
  }

  async checkToken(token: string): Promise<DownloadCheck> {
    const [entitlement] = await this.listDownloadEntitlements(
      { token_hash: hashDownloadToken(token) },
      { take: 1 }
    )

    if (!entitlement) {
      return { ok: false, reason: "invalid" }
    }
    if (entitlement.revoked_at) {
      return { ok: false, reason: "revoked" }
    }
    if (entitlement.expires_at && new Date(entitlement.expires_at) < new Date()) {
      return { ok: false, reason: "expired" }
    }
    if (entitlement.download_count >= entitlement.max_downloads) {
      return { ok: false, reason: "limit_reached" }
    }

    return {
      ok: true,
      entitlement_id: entitlement.id,
      digital_file_id: entitlement.digital_file_id,
    }
  }

  async recordDownload(entitlement_id: string): Promise<void> {
    const entitlement = await this.retrieveDownloadEntitlement(entitlement_id)
    await this.updateDownloadEntitlements({
      id: entitlement_id,
      download_count: entitlement.download_count + 1,
      last_downloaded_at: new Date(),
    })
  }
}

export default DigitalDeliveryModuleService
