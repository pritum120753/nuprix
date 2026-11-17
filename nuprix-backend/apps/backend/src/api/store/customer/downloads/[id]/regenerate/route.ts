import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { resolveEntitlementStatus } from "../../../../../../lib/download-status"
import {
  isFullyPaid,
  PAYMENT_COLLECTION_FIELDS,
} from "../../../../../../lib/order-payment"
import { DIGITAL_DELIVERY_MODULE } from "../../../../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../../../../modules/digital-delivery/service"

function downloadBaseUrl(): string {
  return (process.env.DOWNLOAD_BASE_URL || "http://localhost:9000").replace(
    /\/$/,
    ""
  )
}

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const customerId = req.auth_context?.actor_id
  if (req.auth_context?.actor_type !== "customer" || !customerId) {
    return res
      .status(401)
      .json({ message: "You must sign in to request a new download link." })
  }

  const entitlementId = req.params.id
  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )

  let entitlement: Awaited<
    ReturnType<DigitalDeliveryModuleService["retrieveDownloadEntitlement"]>
  >
  try {
    entitlement = await service.retrieveDownloadEntitlement(entitlementId)
  } catch {
    return res.status(404).json({ message: "Download entitlement not found." })
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "customer_id",
      "status",
      "total",
      ...PAYMENT_COLLECTION_FIELDS,
    ],
    filters: { id: entitlement.order_id },
  })
  const order = orders[0] as
    | {
        id: string
        customer_id?: string | null
        status?: string | null
        total?: unknown
        payment_collections?: Parameters<typeof isFullyPaid>[0]
      }
    | undefined

  const ownsEntitlement =
    entitlement.customer_id === customerId ||
    (!entitlement.customer_id && order?.customer_id === customerId)

  if (!order || !ownsEntitlement) {
    return res.status(404).json({ message: "Download entitlement not found." })
  }

  const requireCapture = process.env.DIGITAL_ALLOW_UNCAPTURED !== "true"
  const status = resolveEntitlementStatus({
    revokedAt: entitlement.revoked_at,
    expiresAt: entitlement.expires_at,
    downloadCount: entitlement.download_count,
    maxDownloads: entitlement.max_downloads,
    isOrderPaid:
      !requireCapture ||
      isFullyPaid(order.payment_collections, { orderTotal: order.total }),
    isOrderCanceled: order.status === "canceled",
  })

  if (status === "awaiting_payment") {
    return res.status(402).json({
      message: "This order is awaiting payment confirmation.",
    })
  }

  if (status !== "available") {
    return res.status(410).json({
      message: `This download is ${status.replace("_", " ")} and cannot be regenerated.`,
    })
  }

  const token = await service.rotateToken(entitlement.id)
  const download_url = `${downloadBaseUrl()}/downloads/${token}`

  res.setHeader("Cache-Control", "private, no-store")
  return res.json({
    entitlement_id: entitlement.id,
    download_url,
  })
}
