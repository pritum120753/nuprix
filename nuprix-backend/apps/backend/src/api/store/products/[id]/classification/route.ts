import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { DIGITAL_DELIVERY_MODULE } from "../../../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../../../modules/digital-delivery/service"
import {
  PRODUCT_TYPE_METADATA_KEY,
  buildProductClassificationPayload,
} from "../../../../../lib/product-classification"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productId = req.params.id
  const productService = req.scope.resolve(Modules.PRODUCT)
  const digitalDeliveryService: DigitalDeliveryModuleService =
    req.scope.resolve(DIGITAL_DELIVERY_MODULE)

  let product: { id: string; status?: string; metadata?: Record<string, unknown> | null }
  try {
    product = await productService.retrieveProduct(productId, {
      select: ["id", "status", "metadata"],
    })
  } catch {
    res.status(404).json({ message: "Product not found" })
    return
  }

  if (product.status !== "published") {
    res.status(404).json({ message: "Product not found" })
    return
  }

  const digitalFiles = await digitalDeliveryService.listDigitalFiles({
    product_id: productId,
  })

  res.json(
    buildProductClassificationPayload({
      productId,
      explicitType: product.metadata?.[PRODUCT_TYPE_METADATA_KEY],
      digitalFiles,
    })
  )
}
