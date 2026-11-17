import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createDownloadUrl } from "../../../lib/digital-storage"
import {
  isFullyPaid,
  PAYMENT_COLLECTION_FIELDS,
} from "../../../lib/order-payment"
import { DIGITAL_DELIVERY_MODULE } from "../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../modules/digital-delivery/service"

// Public on purpose: the unguessable token in the URL is the credential, so
// it works from an email link with no publishable key or login.
export const AUTHENTICATE = false

const MESSAGES = {
  invalid: "This download link is not valid.",
  revoked: "Access to this download has been withdrawn.",
  expired: "This download link has expired.",
  limit_reached: "The download limit for this file has been reached.",
  unpaid: "This order's payment has not been confirmed yet.",
  unavailable: "This file is not available right now.",
} as const

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const token = req.params.token
  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const locking = req.scope.resolve(Modules.LOCKING)

  const preliminary = await service.checkToken(token)
  if (!preliminary.ok) {
    const status = preliminary.reason === "invalid" ? 404 : 410
    return res.status(status).json({ message: MESSAGES[preliminary.reason] })
  }

  const entitlement = await service.retrieveDownloadEntitlement(
    preliminary.entitlement_id
  )

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "status", "total", ...PAYMENT_COLLECTION_FIELDS],
    filters: { id: entitlement.order_id },
  })
  const order = orders[0]
  const requireCapture = process.env.DIGITAL_ALLOW_UNCAPTURED !== "true"
  const paid = isFullyPaid(order?.payment_collections, {
    orderTotal: order?.total,
  })
  const canceled = order?.status === "canceled"

  if (!order || canceled || (requireCapture && !paid)) {
    return res.status(402).json({ message: MESSAGES.unpaid })
  }

  // Serialise per entitlement so two parallel requests cannot both pass the
  // limit check and exceed max_downloads. The signed URL is created before the
  // download is counted, so a storage failure never costs the customer a try.
  let outcome:
    | { ok: true; url: string }
    | { ok: false; reason: keyof typeof MESSAGES }

  try {
    outcome = await locking.execute(
      `download:${entitlement.id}`,
      async () => {
        const check = await service.checkToken(token)
        if (!check.ok) {
          return check
        }
        const file = await service.retrieveDigitalFile(check.digital_file_id)
        const url = await createDownloadUrl(file.file_key, file.file_name)
        await service.recordDownload(check.entitlement_id)
        return { ok: true as const, url }
      },
      { timeout: 5 }
    )
  } catch (error) {
    req.scope
      .resolve(ContainerRegistrationKeys.LOGGER)
      .error(
        `Download failed for entitlement ${entitlement.id}: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    return res.status(503).json({ message: MESSAGES.unavailable })
  }

  if (!outcome.ok) {
    const status = outcome.reason === "invalid" ? 404 : 410
    return res.status(status).json({ message: MESSAGES[outcome.reason] })
  }

  res.setHeader("Cache-Control", "no-store")
  res.setHeader("Referrer-Policy", "no-referrer")
  return res.redirect(302, outcome.url)
}
