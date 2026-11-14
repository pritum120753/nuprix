import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import type { DownloadOrderStatusInput } from "../../../../lib/customer-download-status"
import {
  getPaymentState,
  PAYMENT_COLLECTION_FIELDS,
} from "../../../../lib/order-payment"
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
  const orders: Array<{
    id: string
    status?: string | null
    total?: unknown
    payment_collections?: Parameters<typeof getPaymentState>[0]
  }> = []
  const pageSize = 100
  for (let skip = 0; ; skip += pageSize) {
    const { data: page } = await query.graph({
      entity: "order",
      fields: ["id", "status", "total", ...PAYMENT_COLLECTION_FIELDS],
      filters: { customer_id: customerId },
      pagination: { skip, take: pageSize },
    })
    orders.push(...(page as typeof orders))
    if (page.length < pageSize) {
      break
    }
  }

  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const orderById = new Map<string, DownloadOrderStatusInput>(
    orders.map((order) => [order.id, order])
  )
  const downloads = await service.listCustomerDownloads(customerId, orderById)

  res.setHeader("Cache-Control", "private, no-store")
  return res.json({ downloads })
}
