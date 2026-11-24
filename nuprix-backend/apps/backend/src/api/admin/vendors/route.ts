import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../modules/vendor"
import { recordAdminAudit } from "../../../lib/admin-audit"
import type VendorModuleService from "../../../modules/vendor/service"
import { normalizeVendorHandle } from "../../../modules/vendor/service"
import type { CreateVendorBody } from "./validators"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const status =
    typeof req.query.status === "string" ? req.query.status : undefined

  const vendors = await vendorService.listVendors(
    status ? { status } : {},
    { order: { created_at: "DESC" }, take: 100 }
  )

  res.json({ vendors })
}

export async function POST(
  req: AuthenticatedMedusaRequest<CreateVendorBody>,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const body = req.validatedBody
  const handle = normalizeVendorHandle(body.handle || body.name)

  if (!handle) {
    return res.status(400).json({ message: "A valid vendor handle is required." })
  }

  const vendor = await vendorService.createVendors({
    name: body.name.trim(),
    handle,
    contact_email: body.contact_email.trim().toLowerCase(),
    description: body.description?.trim() ?? null,
    commission_rate_bps: body.commission_rate_bps ?? null,
    status: "pending",
  })

  await recordAdminAudit(req, {
    action: "vendor.created",
    resource_type: "vendor",
    resource_id: vendor.id,
    after_state: { name: vendor.name, handle: vendor.handle, status: vendor.status },
  })

  res.status(201).json({ vendor })
}
