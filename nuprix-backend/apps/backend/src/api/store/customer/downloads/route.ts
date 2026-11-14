import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { DIGITAL_DELIVERY_MODULE } from "../../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../../modules/digital-delivery/service"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const customerId = req.auth_context?.actor_id
  if (req.auth_context?.actor_type !== "customer" || !customerId) {
    return res.status(401).json({ message: "You must sign in to view downloads." })
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id"],
    filters: { customer_id: customerId },
  })
  const orderIds = orders.map((order: { id: string }) => order.id)

  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const downloads = await service.listCustomerDownloads(customerId, orderIds)

  res.setHeader("Cache-Control", "private, no-store")
  return res.json({ downloads })
}
