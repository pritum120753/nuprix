import { model } from "@medusajs/framework/utils"
import Vendor from "./vendor"

const VendorMember = model
  .define("vendor_member", {
    id: model.id({ prefix: "vmbr" }).primaryKey(),
    vendor: model.belongsTo(() => Vendor, { mappedBy: "members" }),
    user_id: model.text(),
    email: model.text(),
    role: model.enum(["owner", "staff"]).default("owner"),
  })
  .indexes([{ on: ["user_id"] }])

export default VendorMember
