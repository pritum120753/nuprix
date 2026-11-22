import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
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

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "customer_id"],
    filters: { id: req.params.orderId },
  })

  const order = orders[0] as { id: string; customer_id?: string | null } | undefined
  if (!order || order.customer_id !== actorId) {
    return res.status(404).json({ message: "Order not found." })
  }

  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const groups = await vendorService.listVendorFulfillmentGroups(
    { order_id: order.id },
    { order: { created_at: "ASC" }, take: 200 }
  )
  const vendorIds = [...new Set(groups.map((group) => group.vendor_id))]
  const vendors = vendorIds.length
    ? await vendorService.listVendors({ id: vendorIds }, { take: vendorIds.length })
    : []
  const vendorNameById = new Map(vendors.map((vendor) => [vendor.id, vendor.name]))

  const items = groups.length
    ? await vendorService.listVendorFulfillmentItems(
        { order_id: order.id },
        { take: 1000 }
      )
    : []

  return res.json({
    fulfillment_groups: groups.map((group) => ({
      id: group.id,
      vendor_id: group.vendor_id,
      vendor_name: vendorNameById.get(group.vendor_id) ?? "Nuprix Vendor",
      status: group.status,
      carrier: group.carrier,
      tracking_number: group.tracking_number,
      tracking_url:
        typeof group.tracking_url === "string" &&
        group.tracking_url.startsWith("https://")
          ? group.tracking_url
          : null,
      shipped_at: group.shipped_at,
      delivered_at: group.delivered_at,
      canceled_at: group.canceled_at,
      items: items.filter((item) => item.group_id === group.id),
    })),
  })
}
