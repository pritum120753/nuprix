import { MedusaService } from "@medusajs/framework/utils"
import AuditLog from "./models/audit-log"

const REDACTED_KEYS = new Set([
  "token",
  "token_hash",
  "password",
  "secret",
  "api_key",
  "upload_url",
  "download_url",
  "authorization",
])

function redactValue(value: unknown, depth = 0): unknown {
  if (depth > 5 || value === null || value === undefined) {
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item, depth + 1))
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = REDACTED_KEYS.has(key.toLowerCase())
        ? "[REDACTED]"
        : redactValue(val, depth + 1)
    }
    return out
  }
  return value
}

export function sanitizeAuditPayload(
  value: Record<string, unknown> | null | undefined
): Record<string, unknown> | null {
  if (!value) {
    return null
  }
  return redactValue(value) as Record<string, unknown>
}

export type RecordAuditInput = {
  actor_id?: string | null
  actor_type?: string
  action: string
  resource_type: string
  resource_id: string
  before_state?: Record<string, unknown> | null
  after_state?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
}

class AuditLogModuleService extends MedusaService({
  AuditLog,
}) {
  async record(input: RecordAuditInput) {
    return this.createAuditLogs({
      actor_id: input.actor_id ?? null,
      actor_type: input.actor_type ?? "user",
      action: input.action,
      resource_type: input.resource_type,
      resource_id: input.resource_id,
      before_state: sanitizeAuditPayload(input.before_state),
      after_state: sanitizeAuditPayload(input.after_state),
      metadata: sanitizeAuditPayload(input.metadata),
    })
  }
}

export default AuditLogModuleService
