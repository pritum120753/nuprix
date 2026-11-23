import { model } from "@medusajs/framework/utils"

const DownloadEvent = model
  .define("download_event", {
    id: model.id({ prefix: "dlevt" }).primaryKey(),
    entitlement_id: model.text(),
    occurred_at: model.dateTime(),
    ip_hash: model.text(),
    user_agent: model.text().nullable(),
  })
  .indexes([{ on: ["entitlement_id"] }, { on: ["occurred_at"] }])

export default DownloadEvent
