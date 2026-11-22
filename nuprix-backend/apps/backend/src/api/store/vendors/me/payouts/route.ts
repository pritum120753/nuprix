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

  const payoutRecords = await vendorService.listVendorPayouts(
    { vendor_id: membership.vendor.id },
    { order: { created_at: "DESC" }, take: 200 }
  )

  const payouts = payoutRecords.map(
    ({ id, amount, currency_code, payout_method, status, reference, created_at }) => ({
      id,
      amount,
      currency_code,
      payout_method,
      status,
      reference,
      created_at,
    })
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
    const body = req.validatedBody
    const payoutInput = {
      vendorId: membership.vendor.id,
      amount: body.amount,
      currencyCode: body.currency_code,
    }
    const payout =
      body.payout_method === "bank_transfer"
        ? await vendorService.requestPayout({
            ...payoutInput,
            payoutMethod: "bank_transfer",
            bankName: body.bank_name,
            accountName: body.account_name,
            accountNumber: body.account_number,
          })
        : await vendorService.requestPayout({
            ...payoutInput,
            payoutMethod: body.payout_method,
            mobileNumber: body.mobile_number,
          })
    return res.status(201).json({ payout })
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Could not request payout.",
    })
  }
}
