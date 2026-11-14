import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { grantDigitalAccessWorkflow } from "../workflows/grant-digital-access"

// Entitlements are created when the order is placed, but the download route
// refuses to serve a file until the payment is captured.
export default async function orderPlacedDigitalAccess({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await grantDigitalAccessWorkflow(container).run({
    input: { order_id: data.id },
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
