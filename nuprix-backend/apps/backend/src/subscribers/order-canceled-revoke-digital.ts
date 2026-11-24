import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { revokeDigitalAccessWorkflow } from "../workflows/revoke-digital-access"

export default async function orderCanceledRevokeDigital({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  if (!data?.id) {
    return
  }

  await revokeDigitalAccessWorkflow(container).run({
    input: { order_id: data.id },
  })
}

export const config: SubscriberConfig = {
  event: "order.canceled",
}
