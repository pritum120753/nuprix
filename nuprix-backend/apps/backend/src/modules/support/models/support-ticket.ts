import { model } from "@medusajs/framework/utils"

const SupportTicket = model
  .define("support_ticket", {
    id: model.id({ prefix: "sup" }).primaryKey(),
    customer_id: model.text().nullable(),
    email: model.text(),
    name: model.text().nullable(),
    order_id: model.text().nullable(),
    category: model
      .enum(["general", "order", "digital_download", "refund", "other"])
      .default("general"),
    subject: model.text(),
    message: model.text(),
    status: model
      .enum(["open", "in_progress", "resolved", "closed"])
      .default("open"),
    admin_note: model.text().nullable(),
  })
  .indexes([
    { on: ["customer_id"] },
    { on: ["order_id"] },
    { on: ["status"] },
  ])

export default SupportTicket
