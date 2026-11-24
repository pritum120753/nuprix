import type { AuthenticatedMedusaRequest } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { AUDIT_LOG_MODULE } from "../modules/audit-log"
import type AuditLogModuleService from "../modules/audit-log/service"

export async function recordAdminAudit(
  req: AuthenticatedMedusaRequest,
  entry: {
    action: string
    resource_type: string
    resource_id: string
    before_state?: Record<string, unknown> | null
    after_state?: Record<string, unknown> | null
    metadata?: Record<string, unknown> | null
  }
) {
  try {
    const auditLogService: AuditLogModuleService =
      req.scope.resolve(AUDIT_LOG_MODULE)

    await auditLogService.record({
      actor_id: req.auth_context?.actor_id ?? null,
      actor_type: req.auth_context?.actor_type ?? "user",
      ...entry,
    })
  } catch (error) {
    try {
      const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
      logger.warn(
        `Could not record audit log (${entry.action}): ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    } catch {
      // Ignore if logger is unavailable
    }
  }
}
