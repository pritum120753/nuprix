import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { canServeFiles, getOrderAccess } from "../../../../../../lib/download-access"
import { buildDownloadUrl } from "../../../../../../lib/download-url"
import { entitlementBlockReason } from "../../../../../../lib/entitlement-status"
import { DIGITAL_DELIVERY_MODULE } from "../../../../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../../../../modules/digital-delivery/service"

const MESSAGES = {
  not_found: "Download not found.",
  awaiting_payment: "This order's payment has not been confirmed yet.",
  refunded: "This order was refunded, so the file is no longer available.",
  order_canceled: "This order was canceled, so the file is not available.",
  revoked: "Access to this download has been withdrawn.",
  expired: "This download has expired.",
  limit_reached: "The download limit for this file has been reached.",
  busy: "Please try again in a moment.",
} as const

// Issues a fresh personal download link for the signed-in customer's own
// entitlement. The previous link (including the one in the order email) stops
// working the moment this succeeds. The raw token appears only in this
// response and is never stored or logged.
export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  res.setHeader("Cache-Control", "private, no-store")

  const customerId = req.auth_context?.actor_id
  if (req.auth_context?.actor_type !== "customer" || !customerId) {
    return res.status(401).json({ message: "You must sign in to get a download link." })
  }

  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const locking = req.scope.resolve(Modules.LOCKING)
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
  const entitlementId = req.params.id

  // Scoped to this customer. Someone else's id looks exactly like a missing one.
  const [entitlement] = await service.listDownloadEntitlements(
    { id: entitlementId, customer_id: customerId },
    { take: 1 }
  )
  if (!entitlement) {
    return res.status(404).json({ message: MESSAGES.not_found })
  }

  const access = await getOrderAccess(req.scope, entitlement.order_id)
  if (!canServeFiles(access)) {
    const reason =
      access === "refunded"
        ? "refunded"
        : access === "canceled" || access === "missing"
          ? "order_canceled"
          : "awaiting_payment"
    return res.status(402).json({ message: MESSAGES[reason] })
  }

  try {
    // Same lock the download route uses, so a rotation can never interleave
    // with a download being counted.
    const outcome = await locking.execute(
      `download:${entitlement.id}`,
      async () => {
        const [fresh] = await service.listDownloadEntitlements(
          { id: entitlement.id, customer_id: customerId },
          { take: 1 }
        )
        if (!fresh) {
          return { ok: false as const, reason: "not_found" as const }
        }
        const blocked = entitlementBlockReason(fresh)
        if (blocked) {
          return { ok: false as const, reason: blocked }
        }
        const token = await service.rotateToken(fresh.id)
        return { ok: true as const, token }
      },
      { timeout: 5 }
    )

    if (!outcome.ok) {
      const status = outcome.reason === "not_found" ? 404 : 410
      return res.status(status).json({ message: MESSAGES[outcome.reason] })
    }

    logger.info(
      `Download link regenerated for entitlement ${entitlement.id} (customer ${customerId})`
    )
    return res.status(201).json({
      download_url: buildDownloadUrl(outcome.token),
      replaces_previous_link: true,
    })
  } catch (error) {
    logger.error(
      `Could not regenerate download link for entitlement ${entitlement.id}: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
    return res.status(503).json({ message: MESSAGES.busy })
  }
}
