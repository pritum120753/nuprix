import { HttpTypes } from "@medusajs/types"

export type ProductFulfillmentType =
  | "digital"
  | "physical"
  | "mixed"
  | "unknown"

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

export const getProductFulfillmentType = (
  product: HttpTypes.StoreProduct,
  classification?: ProductClassification | null
): ProductFulfillmentType => {
  if (classification?.product_type) {
    return classification.product_type
  }
  return "unknown"
}

export type LineItemWithProduct = {
  product?: HttpTypes.StoreProduct | null
  variant?: { product?: HttpTypes.StoreProduct | null } | null
  metadata?: Record<string, unknown> | null
  classification?: ProductClassification | null
}

export const getLineItemFulfillmentType = (
  item: LineItemWithProduct
): ProductFulfillmentType => {
  if (item.classification) {
    return item.classification.product_type
  }
  const product = item.product ?? item.variant?.product
  if (product) {
    return getProductFulfillmentType(
      product,
      item.classification
    )
  }
  return "unknown"
}

export const getCartDeliverySplit = (
  items?: LineItemWithProduct[] | null
) => {
  let hasDigital = false
  let hasPhysical = false
  let hasUnknown = false

  for (const item of items ?? []) {
    const type = getLineItemFulfillmentType(item)
    if (type === "digital") {
      hasDigital = true
    } else if (type === "mixed") {
      hasDigital = true
      hasPhysical = true
    } else if (type === "physical") {
      hasPhysical = true
    } else {
      hasUnknown = true
      hasPhysical = true
    }
  }

  return {
    hasDigital,
    hasPhysical,
    isMixed: hasDigital && hasPhysical,
    isDigitalOnly: hasDigital && !hasPhysical && !hasUnknown,
    hasUnknown,
  }
}
