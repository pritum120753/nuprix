"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders } from "./cookies"

export type CustomerDownload = {
  id: string
  order_id: string
  digital_file_id: string
  title: string
  file_name: string
  download_count: number
  max_downloads: number
  expires_at: string | null
  revoked_at: string | null
  last_downloaded_at: string | null
  created_at: string
  status:
    | "available"
    | "awaiting_payment"
    | "refunded"
    | "order_canceled"
    | "unavailable"
    | "expired"
    | "revoked"
    | "limit_reached"
}

export const listCustomerDownloads = async (): Promise<CustomerDownload[]> => {
  const headers = await getAuthHeaders()

  return sdk.client
    .fetch<{ downloads: CustomerDownload[] }>("/store/customer/downloads", {
      method: "GET",
      headers,
      cache: "no-store",
    })
    .then(({ downloads }) => downloads)
    .catch((error) => medusaError(error))
}

export const regenerateCustomerDownload = async (
  entitlementId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const headers = await getAuthHeaders()
    await sdk.client.fetch(
      `/store/customer/downloads/${encodeURIComponent(entitlementId)}/regenerate`,
      { method: "POST", headers, cache: "no-store" }
    )
    return {
      success: true,
      message: "A fresh download link was sent to your order email.",
    }
  } catch {
    return {
      success: false,
      message: "We could not send a new link. Please try again later.",
    }
  }
}
