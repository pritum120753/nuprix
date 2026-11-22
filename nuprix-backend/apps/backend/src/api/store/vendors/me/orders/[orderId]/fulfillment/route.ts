import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../../../modules/vendor"
import type VendorModuleService from "../../../../../../../modules/vendor/service"
import { recordAdminAudit } from "../../../../../../../lib/admin-audit"
import type { UpdateVendorFulfillmentBody } from "../../../../validators"

function safeHttpsUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  try {
    const url = new URL(raw)
    return url.protocol === "https:" ? url.toString() : null
  } catch {
    return null
  }
}

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdateVendorFulfillmentBody>,
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

  const [existing] = await vendorService.listVendorFulfillmentGroups(
    {
      vendor_id: membership.vendor.id,
      order_id: req.params.orderId,
    },
    { take: 1 }
  )
  if (!existing) {
    return res.status(404).json({ message: "Fulfillment group not found." })
  }

  const trackingUrl = safeHttpsUrl(req.validatedBody.tracking_url)
  if (req.validatedBody.tracking_url && !trackingUrl) {
    return res.status(400).json({ message: "Tracking URL must use HTTPS." })
  }

  const now = new Date()
  const status = req.validatedBody.status
  const updates = {
    id: existing.id,
    status,
    carrier:
      req.validatedBody.carrier !== undefined
        ? req.validatedBody.carrier
        : existing.carrier,
    tracking_number:
      req.validatedBody.tracking_number !== undefined
        ? req.validatedBody.tracking_number
        : existing.tracking_number,
    tracking_url:
      req.validatedBody.tracking_url !== undefined
        ? trackingUrl
        : existing.tracking_url,
    shipped_at:
      status === "shipped" ? existing.shipped_at ?? now : existing.shipped_at,
    delivered_at:
      status === "delivered" ? existing.delivered_at ?? now : existing.delivered_at,
    canceled_at:
      status === "canceled" ? existing.canceled_at ?? now : existing.canceled_at,
  }

  const updated = await vendorService.updateVendorFulfillmentGroups(updates)

  await recordAdminAudit(req, {
    action: "vendor.fulfillment.updated",
    resource_type: "vendor_fulfillment_group",
    resource_id: updated.id,
    before_state: {
      vendor_id: membership.vendor.id,
      order_id: req.params.orderId,
      status: existing.status,
      tracking_url: existing.tracking_url,
    },
    after_state: {
      vendor_id: membership.vendor.id,
      order_id: req.params.orderId,
      status: updated.status,
      tracking_url: updated.tracking_url,
    },
  })

  return res.json({ fulfillment_group: updated })
}
