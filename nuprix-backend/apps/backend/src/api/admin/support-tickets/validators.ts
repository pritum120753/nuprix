import { z } from "@medusajs/framework/zod"

export const UpdateSupportTicketSchema = z.object({
  status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
  admin_note: z.string().max(2000).nullable().optional(),
})

export type UpdateSupportTicketBody = z.infer<typeof UpdateSupportTicketSchema>
