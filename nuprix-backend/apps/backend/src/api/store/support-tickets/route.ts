import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SUPPORT_MODULE } from "../../../modules/support"
import type SupportModuleService from "../../../modules/support/service"
import type { CreateSupportTicketBody } from "./validators"

type RequestWithOptionalAuth = MedusaRequest<CreateSupportTicketBody> & {
  auth_context?: { actor_id?: string; actor_type?: string }
}

export async function POST(
  req: RequestWithOptionalAuth,
  res: MedusaResponse
) {
  const supportService: SupportModuleService =
    req.scope.resolve(SUPPORT_MODULE)

  const body = req.validatedBody
  const customerId =
    req.auth_context?.actor_type === "customer"
      ? req.auth_context.actor_id ?? null
      : null

  const ticket = await supportService.createSupportTickets({
    customer_id: customerId,
    email: body.email.trim().toLowerCase(),
    name: body.name?.trim() || null,
    order_id: body.order_id?.trim() || null,
    category: body.category ?? "general",
    subject: body.subject.trim(),
    message: body.message.trim(),
    status: "open",
  })

  res.status(201).json({
    ticket: {
      id: ticket.id,
      status: ticket.status,
      created_at: ticket.created_at,
    },
  })
}
