import { model } from "@medusajs/framework/utils"

const VendorPayout = model
  .define("vendor_payout", {
    id: model.id({ prefix: "vpout" }).primaryKey(),
    vendor_id: model.text(),
    amount: model.number(),
    currency_code: model.text(),
    status: model
      .enum(["requested", "approved", "paid", "rejected"])
      .default("requested"),
    reference: model.text().nullable(),
    admin_note: model.text().nullable(),
  })
  .indexes([{ on: ["vendor_id"] }])

export default VendorPayout
