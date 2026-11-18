import { z } from "@medusajs/framework/zod"

export const CreateVendorSchema = z.object({
  name: z.string().min(2).max(160),
  handle: z.string().min(2).max(80).optional(),
  contact_email: z.string().email().max(200),
  description: z.string().max(1000).optional(),
  commission_rate_bps: z.number().int().min(0).max(10000).optional(),
})
export type CreateVendorBody = z.infer<typeof CreateVendorSchema>

export const UpdateVendorSchema = z.object({
  name: z.string().min(2).max(160).optional(),
  contact_email: z.string().email().max(200).optional(),
  status: z.enum(["pending", "verified", "suspended"]).optional(),
  description: z.string().max(1000).nullable().optional(),
  commission_rate_bps: z.number().int().min(0).max(10000).nullable().optional(),
})
export type UpdateVendorBody = z.infer<typeof UpdateVendorSchema>

export const AssignVendorProductSchema = z.object({
  product_id: z.string().min(1),
  approval_status: z
    .enum(["draft", "pending_review", "approved", "rejected"])
    .optional(),
  rejection_reason: z.string().max(500).nullable().optional(),
})
export type AssignVendorProductBody = z.infer<typeof AssignVendorProductSchema>
