import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { recordAdminAudit } from "../../../../../lib/admin-audit"
import { DIGITAL_DELIVERY_MODULE } from "../../../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../../../modules/digital-delivery/service"
import {
  PRODUCT_TYPE_METADATA_KEY,
  buildProductClassificationPayload,
} from "../../../../../lib/product-classification"
import type { UpdateProductClassificationBody } from "./validators"

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdateProductClassificationBody>,
  res: MedusaResponse
) {
  const productId = req.params.id
  const { product_type } = req.validatedBody

  const productService = req.scope.resolve(Modules.PRODUCT)
  const digitalDeliveryService: DigitalDeliveryModuleService =
    req.scope.resolve(DIGITAL_DELIVERY_MODULE)

  let product: { id: string; metadata?: Record<string, unknown> | null }
  try {
    product = await productService.retrieveProduct(productId, {
      select: ["id", "metadata"],
    })
  } catch {
    res.status(404).json({ message: "Product not found" })
    return
  }

  const digitalFiles = await digitalDeliveryService.listDigitalFiles({
    product_id: productId,
  })

  if (product_type === "physical" && digitalFiles.length > 0) {
    res.status(400).json({
      message:
        "Cannot classify a product with attached digital files as physical. Remove digital files first or set product_type to 'mixed'.",
    })
    return
  }

  const nextMetadata = {
    ...(product.metadata ?? {}),
    [PRODUCT_TYPE_METADATA_KEY]: product_type,
  }

  await productService.updateProducts(productId, {
    metadata: nextMetadata,
  })

  await recordAdminAudit(req, {
    action: "product.classification.updated",
    resource_type: "product",
    resource_id: productId,
    before_state: {
      product_type: product.metadata?.[PRODUCT_TYPE_METADATA_KEY] ?? null,
    },
    after_state: { product_type },
  })

  res.json(
    buildProductClassificationPayload({
      productId,
      explicitType: product_type,
      digitalFiles,
    })
  )
}
