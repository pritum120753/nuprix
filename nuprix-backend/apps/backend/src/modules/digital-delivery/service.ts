import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import {
  resolveEntitlementStatus,
  type EntitlementStatus,
} from "../../lib/download-status"
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

export type OrderPaymentState = {
  paid: boolean
  canceled: boolean
}

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
  status: EntitlementStatus
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
    orderIds: string[],
    orderPaymentState?: Map<string, OrderPaymentState>
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
    const nowMs = Date.now()

    return entitlements.map((item) => {
      const file = fileById.get(item.digital_file_id)
      const orderState = orderPaymentState?.get(item.order_id)
      const status = resolveEntitlementStatus({
        revokedAt: item.revoked_at,
        expiresAt: item.expires_at,
        downloadCount: item.download_count,
        maxDownloads: item.max_downloads,
        isOrderPaid: orderState?.paid,
        isOrderCanceled: orderState?.canceled,
        nowMs,
      })

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
    const status = resolveEntitlementStatus({
      revokedAt: entitlement.revoked_at,
      expiresAt: entitlement.expires_at,
      downloadCount: entitlement.download_count,
      maxDownloads: entitlement.max_downloads,
    })
    if (status === "revoked" || status === "expired" || status === "limit_reached") {
      return { ok: false, reason: status }
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
