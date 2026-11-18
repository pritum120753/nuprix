import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { AUDIT_LOG_MODULE } from "../../../modules/audit-log"
import type AuditLogModuleService from "../../../modules/audit-log/service"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const auditLogService: AuditLogModuleService =
    req.scope.resolve(AUDIT_LOG_MODULE)

  const filters: Record<string, string> = {}
  if (typeof req.query.resource_type === "string" && req.query.resource_type) {
    filters.resource_type = req.query.resource_type
  }
  if (typeof req.query.resource_id === "string" && req.query.resource_id) {
    filters.resource_id = req.query.resource_id
  }
  if (typeof req.query.action === "string" && req.query.action) {
    filters.action = req.query.action
  }

  const parsedLimit = Number.parseInt(String(req.query.limit ?? "50"), 10)
  const take = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 200)
    : 50

  const audit_logs = await auditLogService.listAuditLogs(filters, {
    order: { created_at: "DESC" },
    take,
  })

  res.json({ audit_logs })
}
