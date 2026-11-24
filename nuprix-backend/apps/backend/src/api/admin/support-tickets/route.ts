import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { SUPPORT_MODULE } from "../../../modules/support"
import type SupportModuleService from "../../../modules/support/service"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const supportService: SupportModuleService =
    req.scope.resolve(SUPPORT_MODULE)

  const status =
    typeof req.query.status === "string" && req.query.status
      ? req.query.status
      : undefined

  const tickets = await supportService.listSupportTickets(
    status ? { status } : {},
    { order: { created_at: "DESC" }, take: 100 }
  )

  res.json({ support_tickets: tickets })
}
