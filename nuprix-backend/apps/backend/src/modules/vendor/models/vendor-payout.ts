import { model } from "@medusajs/framework/utils"

const VendorPayout = model
  .define("vendor_payout", {
    id: model.id({ prefix: "vpout" }).primaryKey(),
    vendor_id: model.text(),
    amount: model.number(),
    currency_code: model.text(),
    payout_method: model
      .enum(["bank_transfer", "bkash", "nagad", "rocket"])
      .nullable(),
    bank_name: model.text().nullable(),
    account_name: model.text().nullable(),
    account_number: model.text().nullable(),
    mobile_number: model.text().nullable(),
    status: model
      .enum(["requested", "approved", "paid", "rejected"])
      .default("requested"),
    reference: model.text().nullable(),
    admin_note: model.text().nullable(),
  })
  .indexes([{ on: ["vendor_id"] }])

export default VendorPayout
