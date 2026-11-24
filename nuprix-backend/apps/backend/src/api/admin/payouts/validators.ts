import { z } from "@medusajs/framework/zod"

export const UpdatePayoutSchema = z.object({
  status: z.enum(["requested", "approved", "paid", "rejected"]),
  reference: z.string().max(200).nullable().optional(),
  admin_note: z.string().max(1000).nullable().optional(),
})

export type UpdatePayoutBody = z.infer<typeof UpdatePayoutSchema>
