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
  status: "available" | "expired" | "revoked" | "limit_reached"
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
