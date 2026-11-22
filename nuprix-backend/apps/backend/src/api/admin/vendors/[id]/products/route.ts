import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../modules/vendor"
import { recordAdminAudit } from "../../../../../lib/admin-audit"
import type VendorModuleService from "../../../../../modules/vendor/service"
import type { AssignVendorProductBody } from "../../validators"
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"

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

  let vendor
  try {
    vendor = await vendorService.retrieveVendor(vendorId)
  } catch {
    return res.status(404).json({ message: "Vendor not found." })
  }

  const {
    product_id,
    approval_status,
    rejection_reason,
    commission_rate_bps,
  } = req.validatedBody

  const [existing] = await vendorService.listVendorProducts(
    { product_id },
    { take: 1 }
  )

  if (existing && existing.vendor_id !== vendorId) {
    return res.status(409).json({
      message: "Product is already assigned to another vendor.",
    })
  }

  if (approval_status === "approved" && commission_rate_bps !== undefined) {
    await vendorService.updateVendors({
      id: vendorId,
      commission_rate_bps,
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
      rejection_reason:
        vendor_product.approval_status === "rejected"
          ? rejection_reason
          : null,
      commission_rate_bps:
        vendor_product.approval_status === "approved"
          ? commission_rate_bps ?? null
          : null,
    },
  })

  if (approval_status === "approved" || approval_status === "rejected") {
    try {
      const notification = req.scope.resolve(Modules.NOTIFICATION)
      await notification.createNotifications({
        to: vendor.contact_email,
        channel: "email",
        template:
          approval_status === "approved"
            ? "vendor-product-approved"
            : "vendor-product-rejected",
        trigger_type: `vendor.product.${approval_status}`,
        data: {
          vendor_name: vendor.name,
          product_id,
          rejection_reason:
            approval_status === "rejected" ? rejection_reason : undefined,
          commission_rate_bps:
            approval_status === "approved" ? commission_rate_bps : undefined,
        },
      })
    } catch (error) {
      req.scope
        .resolve(ContainerRegistrationKeys.LOGGER)
        .warn(
          `Could not send vendor product ${approval_status} notification: ${
            error instanceof Error ? error.message : String(error)
          }`
        )
    }
  }

  res.status(existing ? 200 : 201).json({ vendor_product })
}
