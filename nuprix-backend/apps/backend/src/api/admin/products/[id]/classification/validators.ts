import { z } from "@medusajs/framework/zod"
import { PRODUCT_TYPE_VALUES } from "../../../../../lib/product-classification"

export const UpdateProductClassificationSchema = z.object({
  product_type: z.enum(PRODUCT_TYPE_VALUES),
})

export type UpdateProductClassificationBody = z.infer<
  typeof UpdateProductClassificationSchema
>
