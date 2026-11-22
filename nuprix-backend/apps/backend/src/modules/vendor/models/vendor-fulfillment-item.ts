import { model } from "@medusajs/framework/utils"

const VendorFulfillmentItem = model
  .define("vendor_fulfillment_item", {
    id: model.id({ prefix: "vfitm" }).primaryKey(),
    group_id: model.text(),
    vendor_id: model.text(),
    order_id: model.text(),
    line_item_id: model.text(),
    product_id: model.text().nullable(),
    quantity: model.number(),
  })
  .indexes([
    { on: ["vendor_id"] },
    { on: ["order_id"] },
    { on: ["line_item_id"] },
  ])

export default VendorFulfillmentItem
