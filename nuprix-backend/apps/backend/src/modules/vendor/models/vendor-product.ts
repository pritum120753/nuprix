import { model } from "@medusajs/framework/utils"

const VendorProduct = model
  .define("vendor_product", {
    id: model.id({ prefix: "vprd" }).primaryKey(),
    vendor_id: model.text(),
    product_id: model.text().unique(),
    approval_status: model
      .enum(["draft", "pending_review", "approved", "rejected"])
      .default("pending_review"),
    rejection_reason: model.text().nullable(),
  })
  .indexes([{ on: ["vendor_id"] }])

export default VendorProduct
