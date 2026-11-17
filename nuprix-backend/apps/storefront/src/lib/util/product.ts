import { HttpTypes } from "@medusajs/types"

export type ProductFulfillmentType = "digital" | "physical" | "mixed"

export interface ProductDigitalFileSummary {
  id: string
  title: string
  file_name: string
  mime_type: string | null
  size_bytes: number | null
  license_note: string | null
  max_downloads: number
  expires_after_days: number | null
}

export interface ProductClassification {
  product_id: string
  product_type: ProductFulfillmentType
  has_digital_files: boolean
  digital_files: ProductDigitalFileSummary[]
}

export const isSimpleProduct = (product: HttpTypes.StoreProduct): boolean => {
  return product.options?.length === 1 && product.options[0].values?.length === 1
}

function normalizeFulfillmentType(
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
 * Resolves a product's fulfillment type from the authoritative backend
 * classification first, then product metadata, then legacy tag/metadata
 * fallback for unmigrated catalog records.
 */
export const getProductFulfillmentType = (
  product: HttpTypes.StoreProduct,
  classification?: ProductClassification | null
): ProductFulfillmentType => {
  if (classification?.product_type) {
    return classification.product_type
  }

  const authoritative = normalizeFulfillmentType(
    product.metadata?.nuprix_product_type
  )
  if (authoritative) {
    return authoritative
  }

  const hasLegacyDigitalSignal = Boolean(
    product.metadata?.is_digital ||
      product.tags?.some((t) => {
        const val = t.value?.toLowerCase()
        return val === "digital" || val === "download"
      })
  )

  return hasLegacyDigitalSignal ? "digital" : "physical"
}

export type LineItemWithProduct = {
  product?: HttpTypes.StoreProduct | null
  variant?: { product?: HttpTypes.StoreProduct | null } | null
  metadata?: Record<string, unknown> | null
}

export const getLineItemFulfillmentType = (
  item: LineItemWithProduct
): ProductFulfillmentType => {
  const product = item.product ?? item.variant?.product
  if (product) {
    return getProductFulfillmentType(product)
  }

  const metaType = normalizeFulfillmentType(item.metadata?.nuprix_product_type)
  if (metaType) {
    return metaType
  }

  return item.metadata?.is_digital ? "digital" : "physical"
}

export const getCartDeliverySplit = (
  items?: LineItemWithProduct[] | null
) => {
  let hasDigital = false
  let hasPhysical = false

  for (const item of items ?? []) {
    const type = getLineItemFulfillmentType(item)
    if (type === "digital") {
      hasDigital = true
    } else if (type === "mixed") {
      hasDigital = true
      hasPhysical = true
    } else {
      hasPhysical = true
    }
  }

  return {
    hasDigital,
    hasPhysical,
    isMixed: hasDigital && hasPhysical,
    isDigitalOnly: hasDigital && !hasPhysical,
  }
}
