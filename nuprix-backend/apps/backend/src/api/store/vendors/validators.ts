import { z } from "@medusajs/framework/zod"

export const ApplyVendorSchema = z.object({
  name: z.string().min(2).max(160),
  handle: z.string().min(2).max(80).optional(),
  contact_email: z.string().email().max(200),
  description: z.string().max(1000).optional(),
})
export type ApplyVendorBody = z.infer<typeof ApplyVendorSchema>

export const SubmitVendorProductSchema = z.object({
  product_id: z.string().min(1),
})
export type SubmitVendorProductBody = z.infer<typeof SubmitVendorProductSchema>

export const RequestVendorPayoutSchema = z.object({
  amount: z.number().int().positive(),
  currency_code: z.string().min(3).max(3),
})
export type RequestVendorPayoutBody = z.infer<typeof RequestVendorPayoutSchema>
