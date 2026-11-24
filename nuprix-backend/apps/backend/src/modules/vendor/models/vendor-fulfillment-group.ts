import { model } from "@medusajs/framework/utils"

const VendorFulfillmentGroup = model
  .define("vendor_fulfillment_group", {
    id: model.id({ prefix: "vfgrp" }).primaryKey(),
    vendor_id: model.text(),
    order_id: model.text(),
    status: model
      .enum(["pending", "processing", "shipped", "delivered", "canceled", "exception"])
      .default("pending"),
    carrier: model.text().nullable(),
    tracking_number: model.text().nullable(),
    tracking_url: model.text().nullable(),
    shipped_at: model.dateTime().nullable(),
    delivered_at: model.dateTime().nullable(),
    canceled_at: model.dateTime().nullable(),
  })
  .indexes([
    { on: ["vendor_id"] },
    { on: ["order_id"] },
  ])

export default VendorFulfillmentGroup
