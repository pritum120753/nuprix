import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../modules/vendor"
import type VendorModuleService from "../../../modules/vendor/service"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const status =
    typeof req.query.status === "string" && req.query.status
      ? req.query.status
      : undefined

  const payouts = await vendorService.listVendorPayouts(
    status ? { status } : {},
    { order: { created_at: "DESC" }, take: 200 }
  )

  return res.json({ payouts })
}
