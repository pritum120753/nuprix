import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { recordAdminAudit } from "../../../../lib/admin-audit"
import { VENDOR_MODULE } from "../../../../modules/vendor"
import type VendorModuleService from "../../../../modules/vendor/service"
import type { UpdatePayoutBody } from "../validators"

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdatePayoutBody>,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const payoutId = req.params.id

  let existing
  try {
    existing = await vendorService.retrieveVendorPayout(payoutId)
  } catch {
    return res.status(404).json({ message: "Payout not found." })
  }

  const payout = await vendorService.updateVendorPayouts({
    id: payoutId,
    ...req.validatedBody,
  })

  await recordAdminAudit(req, {
    action: "vendor.payout.updated",
    resource_type: "vendor_payout",
    resource_id: payout.id,
    before_state: { status: existing.status, reference: existing.reference },
    after_state: { status: payout.status, reference: payout.reference },
  })

  return res.json({ payout })
}
