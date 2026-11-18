import { model } from "@medusajs/framework/utils"
import VendorMember from "./vendor-member"

const Vendor = model.define("vendor", {
  id: model.id({ prefix: "vnd" }).primaryKey(),
  name: model.text(),
  handle: model.text().unique(),
  contact_email: model.text(),
  status: model
    .enum(["pending", "verified", "suspended"])
    .default("pending"),
  description: model.text().nullable(),
  commission_rate_bps: model.number().nullable(),
  members: model.hasMany(() => VendorMember, { mappedBy: "vendor" }),
})

export default Vendor
