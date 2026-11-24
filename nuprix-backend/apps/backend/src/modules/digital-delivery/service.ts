import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import {
  type CustomerDownloadStatus,
  type DownloadOrderStatusInput,
  resolveDownloadStatus,
} from "../../lib/customer-download-status"
import {
  hashIpAddress,
  normalizeUserAgent,
} from "../../lib/download-analytics"
import { hashDownloadToken, newDownloadToken } from "../../lib/download-token"
import {
  decryptLicenseKey,
  generateLicenseKey,
} from "../../lib/license-keys"
import DigitalFile from "./models/digital-file"
import DownloadEntitlement from "./models/download-entitlement"
import DownloadEvent from "./models/download-event"

export type GrantInput = {
  order_id: string
  customer_id?: string | null
  email: string
  digital_file_id: string
  max_downloads: number
  expires_after_days?: number | null
  generate_license_key?: boolean
}

export type DownloadEventInput = {
  entitlement_id: string
  ip_address?: string
  user_agent?: string
}

export type DownloadCheck =
  | { ok: true; entitlement_id: string; digital_file_id: string }
  | { ok: false; reason: "invalid" }

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
  status: CustomerDownloadStatus
  license_key: string | null
}

class DigitalDeliveryModuleService extends MedusaService({
  DigitalFile,
  DownloadEntitlement,
  DownloadEvent,
}) {
  async grant(input: GrantInput): Promise<{ id: string; token: string }> {
    if (!input.email) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "An email is required to grant download access"
      )
    }

    const token = newDownloadToken()
    const expiresAt = input.expires_after_days
      ? new Date(Date.now() + input.expires_after_days * 24 * 60 * 60 * 1000)
      : null
    const license = input.generate_license_key ? generateLicenseKey() : null

    const created = await this.createDownloadEntitlements({
      order_id: input.order_id,
      customer_id: input.customer_id ?? null,
      email: input.email,
      digital_file_id: input.digital_file_id,
      token_hash: hashDownloadToken(token),
      license_key_encrypted: license?.encrypted ?? null,
      license_key_hash: license?.hash ?? null,
      max_downloads: input.max_downloads,
      expires_at: expiresAt,
    })

    return { id: created.id, token }
  }

  async listCustomerDownloads(
    customerId: string,
    orderById: ReadonlyMap<string, DownloadOrderStatusInput>
  ): Promise<CustomerDownloadSummary[]> {
    if (!customerId) {
      return []
    }

    const pageSize = 100
    const entitlements = await this.listDownloadEntitlements(
      { customer_id: customerId },
      { order: { created_at: "DESC" }, take: pageSize, skip: 0 }
    )
    for (let skip = pageSize; entitlements.length === skip; skip += pageSize) {
      const page = await this.listDownloadEntitlements(
        { customer_id: customerId },
        { order: { created_at: "DESC" }, take: pageSize, skip }
      )
      entitlements.push(...page)
      if (page.length < pageSize) {
        break
      }
    }

    const fileIds = [...new Set(entitlements.map((item) => item.digital_file_id))]
    const files = fileIds.length
      ? await this.listDigitalFiles({ id: fileIds }, { take: fileIds.length })
      : []
    const fileById = new Map(files.map((file) => [file.id, file]))

    return entitlements.map((item) => {
      const file = fileById.get(item.digital_file_id)
      const status = resolveDownloadStatus(
        item,
        orderById.get(item.order_id) ?? null
      )
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
        license_key:
          status === "available" && item.license_key_encrypted
            ? decryptLicenseKey(item.license_key_encrypted)
            : null,
      }
    })
  }

  async recordDownloadEvent(input: DownloadEventInput): Promise<void> {
    await this.createDownloadEvents({
      entitlement_id: input.entitlement_id,
      occurred_at: new Date(),
      ip_hash: hashIpAddress(input.ip_address),
      user_agent: normalizeUserAgent(input.user_agent),
    })
  }

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

  async revokeByOrder(order_id: string): Promise<{ revoked_count: number }> {
    if (!order_id) {
      return { revoked_count: 0 }
    }
    const entitlements = await this.listDownloadEntitlements(
      { order_id },
      { take: 500 }
    )
    const now = new Date()
    const active = entitlements.filter((item) => !item.revoked_at)
    if (!active.length) {
      return { revoked_count: 0 }
    }
    await this.updateDownloadEntitlements(
      active.map((item) => ({
        id: item.id,
        revoked_at: now,
        license_key_encrypted: null,
        license_key_hash: null,
      }))
    )
    return { revoked_count: active.length }
  }
}

export default DigitalDeliveryModuleService
