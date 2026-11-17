import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  isFullyPaid,
  PAYMENT_COLLECTION_FIELDS,
} from "../../../../lib/order-payment"
import { DIGITAL_DELIVERY_MODULE } from "../../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../../modules/digital-delivery/service"
import type { OrderPaymentState } from "../../../../modules/digital-delivery/service"

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
    fields: ["id", "status", "total", ...PAYMENT_COLLECTION_FIELDS],
    filters: { customer_id: customerId },
  })
  const requireCapture = process.env.DIGITAL_ALLOW_UNCAPTURED !== "true"
  const orderIds: string[] = []
  const orderPaymentState = new Map<string, OrderPaymentState>()

  for (const order of orders as Array<{
    id: string
    status?: string | null
    total?: unknown
    payment_collections?: Parameters<typeof isFullyPaid>[0]
  }>) {
    orderIds.push(order.id)
    orderPaymentState.set(order.id, {
      paid:
        !requireCapture ||
        isFullyPaid(order.payment_collections, { orderTotal: order.total }),
      canceled: order.status === "canceled",
    })
  }

  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const downloads = await service.listCustomerDownloads(
    customerId,
    orderIds,
    orderPaymentState
  )

  res.setHeader("Cache-Control", "private, no-store")
  return res.json({ downloads })
}
