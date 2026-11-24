import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../../modules/vendor"
import type VendorModuleService from "../../../../../../modules/vendor/service"
import { VendorOrderParamSchema } from "../../../validators"

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

  const params = VendorOrderParamSchema.safeParse(req.params)
  if (!params.success) {
    return res.status(400).json({ message: "Invalid order ID." })
  }

  const [group] = await vendorService.listVendorFulfillmentGroups(
    {
      vendor_id: membership.vendor.id,
      order_id: params.data.orderId,
    },
    { take: 1 }
  )
  if (!group) {
    return res.status(404).json({ message: "Fulfillment group not found." })
  }

  const items = await vendorService.listVendorFulfillmentItems(
    {
      vendor_id: membership.vendor.id,
      order_id: params.data.orderId,
      group_id: group.id,
    },
    { take: 1000 }
  )

  return res.json({ fulfillment_group: { ...group, items } })
}
