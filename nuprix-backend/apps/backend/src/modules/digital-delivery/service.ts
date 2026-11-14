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

export type CustomerDownloadSummary = {
  id: string
  order_id: string
  digital_file_id: string
  title: string
  file_name: string
  download_count: number
  max_downloads: number
  expires_at: Date | null
  revoked_at: Date | null
  last_downloaded_at: Date | null
  created_at: Date
  status: "available" | "pending" | "expired" | "revoked" | "limit_reached"
}

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

  // Returns only safe display fields; never return token_hash or a raw token.
  async listCustomerDownloads(
    customerId: string,
    orderIds: string[]
  ): Promise<CustomerDownloadSummary[]> {
    if (!customerId || orderIds.length === 0) {
      return []
    }

    const entitlements = await this.listDownloadEntitlements(
      { customer_id: customerId, order_id: orderIds },
      { order: { created_at: "DESC" }, take: 200 }
    )

    const fileIds = [...new Set(entitlements.map((item) => item.digital_file_id))]
    const files = fileIds.length
      ? await this.listDigitalFiles({ id: fileIds }, { take: fileIds.length })
      : []
    const fileById = new Map(files.map((file) => [file.id, file]))
    const now = Date.now()

    return entitlements.map((item) => {
      const file = fileById.get(item.digital_file_id)
      const status: CustomerDownloadSummary["status"] = item.revoked_at
        ? "revoked"
        : item.expires_at && new Date(item.expires_at).getTime() < now
          ? "expired"
          : item.download_count >= item.max_downloads
            ? "limit_reached"
            : "available"

      return {
        id: item.id,
        order_id: item.order_id,
        digital_file_id: item.digital_file_id,
        title: file?.title ?? "Digital product",
        file_name: file?.file_name ?? "Download",
        download_count: item.download_count,
        max_downloads: item.max_downloads,
        expires_at: item.expires_at,
        revoked_at: item.revoked_at,
        last_downloaded_at: item.last_downloaded_at,
        created_at: item.created_at,
        status,
      }
    })
  }

  // Replaces the token of an existing entitlement (for "resend my link").
  async rotateToken(
    entitlement_id: string
  ): Promise<{ token: string; previous_token_hash: string }> {
    const entitlement = await this.retrieveDownloadEntitlement(entitlement_id)
    const token = newDownloadToken()
    await this.updateDownloadEntitlements({
      id: entitlement_id,
      token_hash: hashDownloadToken(token),
    })
    return { token, previous_token_hash: entitlement.token_hash }
  }

  // Restore the prior link only if the failed email attempt still owns the
  // current token hash. Callers serialize this with the download lock.
  async restoreRotatedToken(
    entitlement_id: string,
    token: string,
    previous_token_hash: string
  ): Promise<void> {
    const entitlement = await this.retrieveDownloadEntitlement(entitlement_id)
    if (entitlement.token_hash !== hashDownloadToken(token)) {
      return
    }
    await this.updateDownloadEntitlements({
      id: entitlement_id,
      token_hash: previous_token_hash,
    })
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
