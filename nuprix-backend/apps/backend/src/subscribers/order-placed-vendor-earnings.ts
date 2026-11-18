import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { isFullyPaid, PAYMENT_COLLECTION_FIELDS } from "../lib/order-payment"
import { VENDOR_MODULE } from "../modules/vendor"
import type VendorModuleService from "../modules/vendor/service"

export default async function orderPlacedVendorEarnings({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  if (!data?.id) {
    return
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const vendorService: VendorModuleService = container.resolve(VENDOR_MODULE)

  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "currency_code",
      "total",
      "items.id",
      "items.product_id",
      "items.total",
      ...PAYMENT_COLLECTION_FIELDS,
    ],
    filters: { id: data.id },
  })

  const order = orders[0] as
    | {
        id: string
        currency_code?: string | null
        total?: unknown
        items?: Array<{
          id: string
          product_id?: string | null
          total?: unknown
        }> | null
        payment_collections?: Parameters<typeof isFullyPaid>[0]
      }
    | undefined

  if (!order || !order.items?.length) {
    return
  }

  const paid = isFullyPaid(order.payment_collections, {
    orderTotal: order.total,
  })

  await vendorService.recordOrderEarnings({
    orderId: order.id,
    currencyCode: order.currency_code || "bdt",
    items: order.items,
    initialStatus: paid ? "available" : "pending",
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
