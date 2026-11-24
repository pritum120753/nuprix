import { z } from "@medusajs/framework/zod"

export const CreateSupportTicketSchema = z.object({
  email: z.string().email().max(200),
  name: z.string().max(160).optional(),
  order_id: z.string().max(120).optional(),
  category: z
    .enum(["general", "order", "digital_download", "refund", "other"])
    .optional(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(4000),
})

export type CreateSupportTicketBody = z.infer<typeof CreateSupportTicketSchema>
