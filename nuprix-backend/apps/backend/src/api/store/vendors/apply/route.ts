import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../modules/vendor"
import type VendorModuleService from "../../../../modules/vendor/service"
import { normalizeVendorHandle } from "../../../../modules/vendor/service"
import type { ApplyVendorBody } from "../validators"

export async function POST(
  req: AuthenticatedMedusaRequest<ApplyVendorBody>,
  res: MedusaResponse
) {
  const actorId = req.auth_context?.actor_id
  if (!actorId) {
    return res
      .status(401)
      .json({ message: "You must sign in to apply as a vendor." })
  }

  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const existing = await vendorService.getVendorForUser(actorId)
  if (existing) {
    return res.status(409).json({
      message: "Your account is already associated with a vendor store.",
      vendor: existing.vendor,
    })
  }

  const body = req.validatedBody
  const handle = normalizeVendorHandle(body.handle || body.name)
  if (!handle) {
    return res
      .status(400)
      .json({ message: "Please provide a valid store name or handle." })
  }

  const vendor = await vendorService.createVendors({
    name: body.name.trim(),
    handle,
    contact_email: body.contact_email.trim().toLowerCase(),
    description: body.description?.trim() ?? null,
    status: "pending",
  })

  await vendorService.createVendorMembers({
    vendor_id: vendor.id,
    user_id: actorId,
    email: body.contact_email.trim().toLowerCase(),
    role: "owner",
  })

  return res.status(201).json({ vendor })
}
