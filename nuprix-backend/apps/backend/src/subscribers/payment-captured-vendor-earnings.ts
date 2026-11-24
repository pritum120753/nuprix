import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { VENDOR_MODULE } from "../modules/vendor"
import type VendorModuleService from "../modules/vendor/service"

export default async function paymentCapturedVendorEarnings({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  if (!data?.id) {
    return
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const vendorService: VendorModuleService = container.resolve(VENDOR_MODULE)

  try {
    const { data: payments } = await query.graph({
      entity: "payment",
      fields: ["id", "payment_collection.order.id"],
      filters: { id: data.id },
    })

    const payment = payments[0] as
      | {
          id: string
          payment_collection?: { order?: { id?: string } | null } | null
        }
      | undefined

    const orderId = payment?.payment_collection?.order?.id
    if (!orderId) {
      return
    }

    await vendorService.markOrderEarningsAvailable(orderId)
  } catch (error) {
    logger.error(
      `Could not mark vendor earnings available on payment.captured (${data.id}): ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

export const config: SubscriberConfig = {
  event: "payment.captured",
}
