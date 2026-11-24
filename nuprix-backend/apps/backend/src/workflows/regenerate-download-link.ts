import {
  ContainerRegistrationKeys,
  MedusaError,
  Modules,
} from "@medusajs/framework/utils"
import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { randomUUID } from "crypto"
import { resolveDownloadStatus } from "../lib/customer-download-status"
import { isDownloadOwnedByCustomer } from "../lib/download-ownership"
import { PAYMENT_COLLECTION_FIELDS } from "../lib/order-payment"
import { DIGITAL_DELIVERY_MODULE } from "../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../modules/digital-delivery/service"

type RegenerateInput = {
  entitlement_id: string
  customer_id: string
}

function downloadBaseUrl(): string {
  return (process.env.DOWNLOAD_BASE_URL || "http://localhost:9000").replace(
    /\/$/,
    ""
  )
}

const regenerateDownloadLinkStep = createStep(
  "regenerate-customer-download-link",
  async (input: RegenerateInput, { container }) => {
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const locking = container.resolve(Modules.LOCKING)
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    const result = await locking.execute(
      `download:${input.entitlement_id}`,
      async () => {
        let entitlement
        try {
          entitlement = await service.retrieveDownloadEntitlement(
            input.entitlement_id
          )
        } catch {
          throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            "Download access was not found."
          )
        }

        const { data: orders } = await query.graph({
          entity: "order",
          fields: [
            "id",
            "customer_id",
            "email",
            "display_id",
            "status",
            "total",
            ...PAYMENT_COLLECTION_FIELDS,
          ],
          filters: {
            id: entitlement.order_id,
            customer_id: input.customer_id,
          },
        })
        const order = orders[0]

        if (
          !order ||
          !isDownloadOwnedByCustomer(
            input.customer_id,
            entitlement.customer_id,
            order.customer_id
          )
        ) {
          throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            "Download access was not found."
          )
        }
        const status = resolveDownloadStatus(
          entitlement,
          order as Parameters<typeof resolveDownloadStatus>[1]
        )
        if (status !== "available") {
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            status === "awaiting_payment"
              ? "A new link is available after payment is confirmed."
              : status === "refunded"
                ? "This order was refunded, so the download is unavailable."
                : status === "order_canceled" || status === "unavailable"
                  ? "This order is unavailable, so the download cannot be regenerated."
                  : "This download entitlement is no longer available."
          )
        }

        const file = await service.retrieveDigitalFile(
          entitlement.digital_file_id
        )
        const { token, previous_token_hash } = await service.rotateToken(
          entitlement.id
        )

        try {
          const notification = container.resolve(Modules.NOTIFICATION)
          await notification.createNotifications({
            to: entitlement.email,
            channel: "email",
            template: "digital-download",
            resource_id: order.id,
            resource_type: "order",
            trigger_type: "order.placed",
            idempotency_key: `digital-download-regeneration-${entitlement.id}-${randomUUID()}`,
            data: {
              order_id: order.id,
              display_id: order.display_id,
              downloads: [
                {
                  title: file.title,
                  file_name: file.file_name,
                  url: `${downloadBaseUrl()}/downloads/${token}`,
                  max_downloads: entitlement.max_downloads,
                  expires_at: entitlement.expires_at,
                },
              ],
            },
          })
        } catch {
          await service.restoreRotatedToken(
            entitlement.id,
            token,
            previous_token_hash
          )
          // Provider errors can include the token-bearing message payload;
          // keep logs free of provider details and raw URLs.
          logger.error("Could not queue a regenerated digital download email.")
          throw new MedusaError(
            MedusaError.Types.UNEXPECTED_STATE,
            "We could not send a new link. Your existing download link remains active."
          )
        }

        return { sent: true }
      },
      { timeout: 10 }
    )

    return new StepResponse(result)
  }
)

export const regenerateDownloadLinkWorkflow = createWorkflow(
  "regenerate-customer-download-link",
  (input: RegenerateInput) => {
    const result = regenerateDownloadLinkStep(input)
    return new WorkflowResponse(result)
  }
)
