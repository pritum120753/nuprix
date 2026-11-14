import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import type { MedusaContainer } from "@medusajs/framework/types"
import { getPaymentState, PAYMENT_COLLECTION_FIELDS } from "./order-payment"

// What an order currently allows for digital files.
export type OrderAccess = "paid" | "unpaid" | "refunded" | "canceled" | "missing"

// Local development only: lets a developer test downloads before a payment
// provider exists. A refunded or canceled order is never served, even with
// this flag on.
export function canServeFiles(access: OrderAccess): boolean {
  if (access === "paid") {
    return true
  }
  return access === "unpaid" && process.env.DIGITAL_ALLOW_UNCAPTURED === "true"
}

export async function getOrderAccessMap(
  container: Pick<MedusaContainer, "resolve">,
  orderIds: string[]
): Promise<Map<string, OrderAccess>> {
  const result = new Map<string, OrderAccess>()
  if (!orderIds.length) {
    return result
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "status", ...PAYMENT_COLLECTION_FIELDS],
    filters: { id: orderIds },
    pagination: { take: orderIds.length },
  })

  const found = new Map(orders.map((order) => [order.id, order]))
  for (const id of orderIds) {
    const order = found.get(id)
    if (!order) {
      result.set(id, "missing")
    } else if (order.status === "canceled") {
      result.set(id, "canceled")
    } else {
      result.set(id, getPaymentState(order.payment_collections))
    }
  }
  return result
}

export async function getOrderAccess(
  container: Pick<MedusaContainer, "resolve">,
  orderId: string
): Promise<OrderAccess> {
  const map = await getOrderAccessMap(container, [orderId])
  return map.get(orderId) ?? "missing"
}
