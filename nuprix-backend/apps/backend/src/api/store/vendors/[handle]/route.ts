import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../modules/vendor"
import type VendorModuleService from "../../../../modules/vendor/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const handle = req.params.handle?.trim().toLowerCase()

  if (!handle) {
    return res.status(404).json({ message: "Vendor not found." })
  }

  const [vendor] = await vendorService.listVendors(
    { handle, status: "verified" },
    { take: 1 }
  )

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found." })
  }

  const approvedProducts = await vendorService.listVendorProducts(
    { vendor_id: vendor.id, approval_status: "approved" },
    { order: { created_at: "DESC" }, take: 200 }
  )

  return res.json({
    vendor: {
      id: vendor.id,
      name: vendor.name,
      handle: vendor.handle,
      description: vendor.description,
    },
    product_ids: approvedProducts.map((item) => item.product_id),
  })
}
