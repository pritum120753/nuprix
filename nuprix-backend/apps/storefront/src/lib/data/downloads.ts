"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders } from "./cookies"

export type CustomerDownloadStatus =
  | "available"
  | "awaiting_payment"
  | "refunded"
  | "order_canceled"
  | "expired"
  | "revoked"
  | "limit_reached"

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
  status: CustomerDownloadStatus
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

export type DownloadLinkResult = { url: string } | { error: string }

// Asks the backend for a fresh personal link. The link replaces the previous
// one, including the one in the order email. The URL carries a secret, so it
// is returned to the caller and never logged here.
export const requestDownloadLink = async (
  downloadId: string
): Promise<DownloadLinkResult> => {
  const headers = await getAuthHeaders()

  try {
    const { download_url } = await sdk.client.fetch<{ download_url: string }>(
      `/store/customer/downloads/${encodeURIComponent(downloadId)}/link`,
      { method: "POST", headers, cache: "no-store" }
    )
    return { url: download_url }
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "We could not create a download link. Please try again."
    return { error: message }
  }
}
