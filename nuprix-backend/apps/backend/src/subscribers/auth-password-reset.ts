import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

function resolveStorefrontUrl(): string {
  const configured =
    process.env.STOREFRONT_URL?.trim() ||
    process.env.STORE_CORS?.split(",")[0]?.trim() ||
    "http://localhost:8000"
  return configured.replace(/\/$/, "")
}

export default async function authPasswordResetHandler({
  event: { data },
  container,
}: SubscriberArgs<{ entity_id: string; actor_type: string; token: string }>) {
  if (data.actor_type !== "customer" || !data.entity_id || !data.token) {
    return
  }

  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const resetUrl = `${resolveStorefrontUrl()}/reset-password?token=${encodeURIComponent(
    data.token
  )}&email=${encodeURIComponent(data.entity_id)}`

  try {
    const notification = container.resolve(Modules.NOTIFICATION)
    await notification.createNotifications({
      to: data.entity_id,
      channel: "email",
      template: "password-reset",
      trigger_type: "auth.password_reset",
      data: {
        email: data.entity_id,
        reset_url: resetUrl,
      },
    })
  } catch (error) {
    logger.error(
      `Could not send password reset email: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
