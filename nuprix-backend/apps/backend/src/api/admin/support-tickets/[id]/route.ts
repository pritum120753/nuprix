import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { recordAdminAudit } from "../../../../lib/admin-audit"
import { SUPPORT_MODULE } from "../../../../modules/support"
import type SupportModuleService from "../../../../modules/support/service"
import type { UpdateSupportTicketBody } from "../validators"

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdateSupportTicketBody>,
  res: MedusaResponse
) {
  const supportService: SupportModuleService =
    req.scope.resolve(SUPPORT_MODULE)
  const ticketId = req.params.id

  let existing
  try {
    existing = await supportService.retrieveSupportTicket(ticketId)
  } catch {
    return res.status(404).json({ message: "Support ticket not found." })
  }

  const ticket = await supportService.updateSupportTickets({
    id: ticketId,
    ...req.validatedBody,
  })

  await recordAdminAudit(req, {
    action: "support_ticket.updated",
    resource_type: "support_ticket",
    resource_id: ticket.id,
    before_state: { status: existing.status },
    after_state: { status: ticket.status },
  })

  res.json({ support_ticket: ticket })
}
