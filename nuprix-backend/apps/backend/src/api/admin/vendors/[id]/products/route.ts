import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../modules/vendor"
import { recordAdminAudit } from "../../../../../lib/admin-audit"
import type VendorModuleService from "../../../../../modules/vendor/service"
import type { AssignVendorProductBody } from "../../validators"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const vendorId = req.params.id

  const products = await vendorService.listVendorProducts(
    { vendor_id: vendorId },
    { order: { created_at: "DESC" }, take: 200 }
  )

  res.json({ vendor_products: products })
}

export async function POST(
  req: AuthenticatedMedusaRequest<AssignVendorProductBody>,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const vendorId = req.params.id

  try {
    await vendorService.retrieveVendor(vendorId)
  } catch {
    return res.status(404).json({ message: "Vendor not found." })
  }

  const { product_id, approval_status, rejection_reason } = req.validatedBody

  const [existing] = await vendorService.listVendorProducts(
    { product_id },
    { take: 1 }
  )

  if (existing && existing.vendor_id !== vendorId) {
    return res.status(409).json({
      message: "Product is already assigned to another vendor.",
    })
  }

  const vendor_product = existing
    ? await vendorService.updateVendorProducts({
        id: existing.id,
        approval_status: approval_status ?? existing.approval_status,
        rejection_reason:
          rejection_reason !== undefined
            ? rejection_reason
            : existing.rejection_reason,
      })
    : await vendorService.createVendorProducts({
        vendor_id: vendorId,
        product_id,
        approval_status: approval_status ?? "pending_review",
        rejection_reason: rejection_reason ?? null,
      })

  await recordAdminAudit(req, {
    action: "vendor.product.assigned",
    resource_type: "vendor_product",
    resource_id: vendor_product.id,
    before_state: existing
      ? { approval_status: existing.approval_status }
      : null,
    after_state: {
      vendor_id: vendorId,
      product_id,
      approval_status: vendor_product.approval_status,
    },
  })

  res.status(existing ? 200 : 201).json({ vendor_product })
}
