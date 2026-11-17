export const PRODUCT_TYPE_VALUES = ["digital", "physical", "mixed"] as const

export type ProductFulfillmentType = (typeof PRODUCT_TYPE_VALUES)[number]

export const PRODUCT_TYPE_METADATA_KEY = "nuprix_product_type"

export interface DigitalFileSummarySource {
  id: string
  title: string
  file_name: string
  mime_type: string | null
  size_bytes: number | null
  license_note: string | null
  max_downloads: number
  expires_after_days: number | null
}

export interface PublicDigitalFileSummary {
  id: string
  title: string
  file_name: string
  mime_type: string | null
  size_bytes: number | null
  license_note: string | null
  max_downloads: number
  expires_after_days: number | null
}

export interface ProductClassificationPayload {
  product_id: string
  product_type: ProductFulfillmentType
  has_digital_files: boolean
  digital_files: PublicDigitalFileSummary[]
}

export function normalizeProductFulfillmentType(
  value: unknown
): ProductFulfillmentType | undefined {
  if (typeof value !== "string") {
    return undefined
  }
  const normalized = value.trim().toLowerCase()
  if (
    normalized === "digital" ||
    normalized === "physical" ||
    normalized === "mixed"
  ) {
    return normalized
  }
  return undefined
}

/**
 * Resolves the authoritative fulfillment classification for a product.
 * Attached digital files always prevent a product from being classified as
 * physical-only; explicit "mixed" preserves hybrid delivery.
 */
export function resolveProductFulfillmentType(input: {
  explicitType?: unknown
  hasDigitalFiles: boolean
}): ProductFulfillmentType {
  const explicit = normalizeProductFulfillmentType(input.explicitType)

  if (explicit === "mixed") {
    return "mixed"
  }

  if (input.hasDigitalFiles) {
    if (explicit === "physical") {
      return "mixed"
    }
    return "digital"
  }

  if (explicit === "digital") {
    return "digital"
  }

  return "physical"
}

export function buildProductClassificationPayload(input: {
  productId: string
  explicitType?: unknown
  digitalFiles: DigitalFileSummarySource[]
}): ProductClassificationPayload {
  const hasDigitalFiles = input.digitalFiles.length > 0

  return {
    product_id: input.productId,
    product_type: resolveProductFulfillmentType({
      explicitType: input.explicitType,
      hasDigitalFiles,
    }),
    has_digital_files: hasDigitalFiles,
    digital_files: input.digitalFiles.map((file) => ({
      id: file.id,
      title: file.title,
      file_name: file.file_name,
      mime_type: file.mime_type ?? null,
      size_bytes: file.size_bytes ?? null,
      license_note: file.license_note ?? null,
      max_downloads: file.max_downloads,
      expires_after_days: file.expires_after_days ?? null,
    })),
  }
}
