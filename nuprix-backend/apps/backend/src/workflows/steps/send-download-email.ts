import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { buildDownloadUrl } from "../../lib/download-url"
import type { GrantResult } from "./grant-download-entitlements"

export const sendDownloadEmailStepId = "send-download-email"

// Delivery email failures must never roll back a paid order, so this step
// swallows and logs errors instead of throwing.
export const sendDownloadEmailStep = createStep(
  sendDownloadEmailStepId,
  async (granted: GrantResult, { container }) => {
    if (!granted.downloads.length || !granted.email) {
      return new StepResponse({ sent: false })
    }

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    try {
      const notification = container.resolve(Modules.NOTIFICATION)
      await notification.createNotifications({
        to: granted.email,
        channel: "email",
        template: "digital-download",
        resource_id: granted.order_id,
        resource_type: "order",
        trigger_type: "order.placed",
        idempotency_key: `digital-download-${granted.order_id}`,
        data: {
          order_id: granted.order_id,
          display_id: granted.display_id,
          downloads: granted.downloads.map((d) => ({
            title: d.title,
            file_name: d.file_name,
            url: buildDownloadUrl(d.token),
            max_downloads: d.max_downloads,
            expires_at: d.expires_at,
          })),
        },
      })
      return new StepResponse({ sent: true })
    } catch (error) {
      logger.error(
        `Could not send download email for order ${granted.order_id}: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
      return new StepResponse({ sent: false })
    }
  }
)
