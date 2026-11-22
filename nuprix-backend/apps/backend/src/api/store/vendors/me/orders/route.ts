import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../modules/vendor"
import type VendorModuleService from "../../../../../modules/vendor/service"

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

  const groups = await vendorService.listVendorFulfillmentGroups(
    { vendor_id: membership.vendor.id },
    { order: { created_at: "DESC" }, take: 200 }
  )

  const orderIds = [...new Set(groups.map((group) => group.order_id))]
  const items = orderIds.length
    ? await vendorService.listVendorFulfillmentItems(
        { vendor_id: membership.vendor.id, order_id: orderIds },
        { take: 1000 }
      )
    : []

  return res.json({
    fulfillment_groups: groups.map((group) => ({
      ...group,
      items: items.filter((item) => item.group_id === group.id),
    })),
  })
}
