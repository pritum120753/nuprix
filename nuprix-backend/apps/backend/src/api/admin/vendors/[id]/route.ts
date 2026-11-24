import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../modules/vendor"
import { recordAdminAudit } from "../../../../lib/admin-audit"
import type VendorModuleService from "../../../../modules/vendor/service"
import type { UpdateVendorBody } from "../validators"

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdateVendorBody>,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const vendorId = req.params.id

  let existing
  try {
    existing = await vendorService.retrieveVendor(vendorId)
  } catch {
    return res.status(404).json({ message: "Vendor not found." })
  }

  const vendor = await vendorService.updateVendors({
    id: vendorId,
    ...req.validatedBody,
  })

  await recordAdminAudit(req, {
    action: "vendor.updated",
    resource_type: "vendor",
    resource_id: vendor.id,
    before_state: {
      status: existing.status,
      commission_rate_bps: existing.commission_rate_bps,
    },
    after_state: {
      status: vendor.status,
      commission_rate_bps: vendor.commission_rate_bps,
    },
  })

  res.json({ vendor })
}
