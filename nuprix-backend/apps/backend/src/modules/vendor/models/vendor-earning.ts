import { model } from "@medusajs/framework/utils"

const VendorEarning = model
  .define("vendor_earning", {
    id: model.id({ prefix: "vern" }).primaryKey(),
    vendor_id: model.text(),
    order_id: model.text(),
    line_item_id: model.text().unique(),
    currency_code: model.text(),
    gross_amount: model.number(),
    commission_rate_bps: model.number(),
    platform_fee: model.number(),
    vendor_net: model.number(),
    status: model
      .enum(["pending", "available", "reversed"])
      .default("available"),
  })
  .indexes([{ on: ["vendor_id"] }, { on: ["order_id"] }])

export default VendorEarning
