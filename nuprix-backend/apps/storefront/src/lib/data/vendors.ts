"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type PublicVendorProfile = {
  vendor: {
    id: string
    name: string
    handle: string
    description: string | null
  }
  product_ids: string[]
}

export const retrievePublicVendor = async (
  handle: string
): Promise<PublicVendorProfile | null> => {
  const next = {
    ...(await getCacheOptions("vendors")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<PublicVendorProfile>(
      `/store/vendors/${encodeURIComponent(handle)}`,
      {
        method: "GET",
        next,
      }
    )
    .catch(() => null)
}
