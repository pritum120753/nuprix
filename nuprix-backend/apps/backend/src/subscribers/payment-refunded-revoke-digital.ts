import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { revokeDigitalAccessWorkflow } from "../workflows/revoke-digital-access"

export default async function paymentRefundedRevokeDigital({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  if (!data?.id) {
    return
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

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

    await revokeDigitalAccessWorkflow(container).run({
      input: { order_id: orderId },
    })
  } catch (error) {
    logger.error(
      `Could not revoke digital access on payment.refunded (${data.id}): ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

export const config: SubscriberConfig = {
  event: "payment.refunded",
}
