import { model } from "@medusajs/framework/utils"

const AuditLog = model
  .define("audit_log", {
    id: model.id({ prefix: "alog" }).primaryKey(),
    actor_id: model.text().nullable(),
    actor_type: model.text().default("user"),
    action: model.text(),
    resource_type: model.text(),
    resource_id: model.text(),
    before_state: model.json().nullable(),
    after_state: model.json().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    { on: ["resource_type", "resource_id"] },
    { on: ["actor_id"] },
  ])

export default AuditLog
