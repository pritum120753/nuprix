import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../modules/vendor"
import type VendorModuleService from "../../../../modules/vendor/service"
import type { UpdateVendorBody } from "../validators"

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdateVendorBody>,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const vendorId = req.params.id

  try {
    await vendorService.retrieveVendor(vendorId)
  } catch {
    return res.status(404).json({ message: "Vendor not found." })
  }

  const vendor = await vendorService.updateVendors({
    id: vendorId,
    ...req.validatedBody,
  })

  res.json({ vendor })
}
