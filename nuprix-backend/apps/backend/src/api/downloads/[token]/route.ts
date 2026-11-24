import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  type CustomerDownloadStatus,
  resolveDownloadStatus,
} from "../../../lib/customer-download-status"
import { createDownloadUrl } from "../../../lib/digital-storage"
import { PAYMENT_COLLECTION_FIELDS } from "../../../lib/order-payment"
import { DIGITAL_DELIVERY_MODULE } from "../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../modules/digital-delivery/service"

export const AUTHENTICATE = false

const MESSAGES = {
  invalid: "This download link is not valid.",
  revoked: "Access to this download has been withdrawn.",
  expired: "This download link has expired.",
  limit_reached: "The download limit for this file has been reached.",
  awaiting_payment: "This order's payment has not been confirmed yet.",
  refunded: "This order was refunded, so the file is no longer available.",
  order_canceled: "This order was canceled, so the file is not available.",
  unavailable: "This file is not available right now.",
} as const

function blockedStatusResponse(
  status: Exclude<CustomerDownloadStatus, "available"> | "invalid",
  res: MedusaResponse
) {
  if (status === "invalid") {
    return res.status(404).json({ message: MESSAGES.invalid })
  }
  const statusCode =
    status === "awaiting_payment" ? 402 : status === "unavailable" ? 404 : 410
  return res.status(statusCode).json({ message: MESSAGES[status] })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const token = req.params.token
  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const locking = req.scope.resolve(Modules.LOCKING)

  const preliminary = await service.checkToken(token)
  if (!preliminary.ok) {
    return blockedStatusResponse("invalid", res)
  }

  let outcome:
    | { ok: true; url: string; entitlementId: string }
    | {
        ok: false
        status: Exclude<CustomerDownloadStatus, "available"> | "invalid"
      }

  try {
    outcome = await locking.execute(
      `download:${preliminary.entitlement_id}`,
      async () => {
        const check = await service.checkToken(token)
        if (!check.ok) {
          return { ok: false as const, status: "invalid" as const }
        }
        const currentEntitlement = await service.retrieveDownloadEntitlement(
          check.entitlement_id
        )
        const { data: currentOrders } = await query.graph({
          entity: "order",
          fields: ["id", "status", "total", ...PAYMENT_COLLECTION_FIELDS],
          filters: { id: currentEntitlement.order_id },
        })
        const status = resolveDownloadStatus(
          currentEntitlement,
          currentOrders[0] ?? null
        )
        if (status !== "available") {
          return { ok: false as const, status }
        }
        const file = await service.retrieveDigitalFile(check.digital_file_id)
        const url = await createDownloadUrl(file.file_key, file.file_name)
        await service.recordDownload(check.entitlement_id)
        return {
          ok: true as const,
          url,
          entitlementId: check.entitlement_id,
        }
      },
      { timeout: 5 }
    )
  } catch {
    req.scope
      .resolve(ContainerRegistrationKeys.LOGGER)
      .error("Download request failed while creating a temporary signed URL.")
    return res.status(503).json({ message: MESSAGES.unavailable })
  }

  if (!outcome.ok) {
    return blockedStatusResponse(outcome.status, res)
  }

  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
  void (async () => {
    try {
      await service.recordDownloadEvent({
        entitlement_id: outcome.entitlementId,
        ip_address: req.ip,
        user_agent: req.headers["user-agent"],
      })
    } catch (error: unknown) {
      logger.error(
        `Failed to record download event: ${
          error instanceof Error ? error.message : "unknown error"
        }`
      )
    }
  })()

  res.setHeader("Cache-Control", "no-store")
  res.setHeader("Referrer-Policy", "no-referrer")
  return res.redirect(302, outcome.url)
}
