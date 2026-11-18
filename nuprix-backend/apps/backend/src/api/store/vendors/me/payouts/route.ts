import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../modules/vendor"
import type VendorModuleService from "../../../../../modules/vendor/service"
import type { RequestVendorPayoutBody } from "../../validators"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const actorId = req.auth_context?.actor_id
  if (!actorId) {
    return res.status(401).json({ message: "Authentication required." })
  }

  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const membership = await vendorService.getVendorForUser(actorId)
  if (!membership) {
    return res.status(404).json({ message: "No vendor store found." })
  }

  const payouts = await vendorService.listVendorPayouts(
    { vendor_id: membership.vendor.id },
    { order: { created_at: "DESC" }, take: 200 }
  )

  return res.json({ payouts })
}

export async function POST(
  req: AuthenticatedMedusaRequest<RequestVendorPayoutBody>,
  res: MedusaResponse
) {
  const actorId = req.auth_context?.actor_id
  if (!actorId) {
    return res.status(401).json({ message: "Authentication required." })
  }

  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const membership = await vendorService.getVendorForUser(actorId)
  if (!membership) {
    return res.status(404).json({ message: "No vendor store found." })
  }

  if (membership.vendor.status !== "verified") {
    return res
      .status(403)
      .json({ message: "Only verified vendors can request payouts." })
  }

  try {
    const payout = await vendorService.requestPayout({
      vendorId: membership.vendor.id,
      amount: req.validatedBody.amount,
      currencyCode: req.validatedBody.currency_code,
    })
    return res.status(201).json({ payout })
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Could not request payout.",
    })
  }
}
