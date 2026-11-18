import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../modules/vendor"
import type VendorModuleService from "../../../../../modules/vendor/service"
import type { SubmitVendorProductBody } from "../../validators"

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

  const vendor_products = await vendorService.listVendorProducts(
    { vendor_id: membership.vendor.id },
    { order: { created_at: "DESC" }, take: 200 }
  )

  return res.json({ vendor_products })
}

export async function POST(
  req: AuthenticatedMedusaRequest<SubmitVendorProductBody>,
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
    return res.status(403).json({
      message: "Your vendor account must be verified before submitting products.",
    })
  }

  const { product_id } = req.validatedBody
  const [existing] = await vendorService.listVendorProducts(
    { product_id },
    { take: 1 }
  )
  if (existing && existing.vendor_id !== membership.vendor.id) {
    return res.status(404).json({ message: "Product not found." })
  }

  const vendor_product = existing
    ? await vendorService.updateVendorProducts({
        id: existing.id,
        approval_status: "pending_review",
        rejection_reason: null,
      })
    : await vendorService.createVendorProducts({
        vendor_id: membership.vendor.id,
        product_id,
        approval_status: "pending_review",
      })

  return res.status(existing ? 200 : 201).json({ vendor_product })
}
