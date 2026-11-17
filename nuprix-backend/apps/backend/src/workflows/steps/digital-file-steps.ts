import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { DIGITAL_DELIVERY_MODULE } from "../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../modules/digital-delivery/service"
import type { CreateDigitalFileBody } from "../../api/admin/digital-files/validators"
import {
  PRODUCT_TYPE_METADATA_KEY,
  resolveProductFulfillmentType,
} from "../../lib/product-classification"

export const createDigitalFileStep = createStep(
  "create-digital-file",
  async (input: CreateDigitalFileBody, { container }) => {
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    const digital_file = await service.createDigitalFiles(input)
    return new StepResponse(digital_file, digital_file.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    await service.deleteDigitalFiles(id)
  }
)

export const deleteDigitalFileStep = createStep(
  "delete-digital-file",
  async (input: { id: string }, { container }) => {
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    let productId: string | undefined
    try {
      const existing = await service.retrieveDigitalFile(input.id)
      productId = existing.product_id
    } catch {
      productId = undefined
    }
    await service.softDeleteDigitalFiles(input.id)
    return new StepResponse(
      { id: input.id, product_id: productId },
      input.id
    )
  },
  async (id, { container }) => {
    if (!id) {
      return
    }
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    await service.restoreDigitalFiles(id)
  }
)

export const syncProductClassificationStep = createStep(
  "sync-product-classification",
  async (input: { product_id?: string }, { container }) => {
    if (!input.product_id) {
      return new StepResponse(null)
    }

    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    const productService = container.resolve(Modules.PRODUCT)

    let product: { id: string; metadata?: Record<string, unknown> | null }
    try {
      product = await productService.retrieveProduct(input.product_id, {
        select: ["id", "metadata"],
      })
    } catch {
      return new StepResponse(null)
    }

    const files = await service.listDigitalFiles({
      product_id: input.product_id,
    })

    const nextType = resolveProductFulfillmentType({
      explicitType: product.metadata?.[PRODUCT_TYPE_METADATA_KEY],
      hasDigitalFiles: files.length > 0,
    })

    if (product.metadata?.[PRODUCT_TYPE_METADATA_KEY] !== nextType) {
      await productService.updateProducts(input.product_id, {
        metadata: {
          ...(product.metadata ?? {}),
          [PRODUCT_TYPE_METADATA_KEY]: nextType,
        },
      })
    }

    return new StepResponse({ product_id: input.product_id, product_type: nextType })
  }
)
