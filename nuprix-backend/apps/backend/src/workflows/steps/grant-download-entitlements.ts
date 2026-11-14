import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { DIGITAL_DELIVERY_MODULE } from "../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../modules/digital-delivery/service"

export type GrantedDownload = {
  entitlement_id: string
  token: string
  title: string
  file_name: string
  max_downloads: number
  expires_at: string | null
}

export type GrantResult = {
  order_id: string
  email: string | null
  display_id: number | string | null
  downloads: GrantedDownload[]
}

export const grantDownloadEntitlementsStepId = "grant-download-entitlements"

export const grantDownloadEntitlementsStep = createStep(
  grantDownloadEntitlementsStepId,
  async (input: { order_id: string }, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )

    const { data: orders } = await query.graph({
      entity: "order",
      fields: ["id", "display_id", "email", "customer_id", "items.product_id"],
      filters: { id: input.order_id },
    })
    const order = orders[0]

    const empty: GrantResult = {
      order_id: input.order_id,
      email: order?.email ?? null,
      display_id: order?.display_id ?? null,
      downloads: [],
    }
    if (!order || !order.email) {
      return new StepResponse(empty, [] as string[])
    }

    const productIds = [
      ...new Set(
        (order.items ?? [])
          .map((item) => item?.product_id)
          .filter((id): id is string => Boolean(id))
      ),
    ]
    if (!productIds.length) {
      return new StepResponse(empty, [] as string[])
    }

    const files = await service.listDigitalFiles({ product_id: productIds })
    if (!files.length) {
      return new StepResponse(empty, [] as string[])
    }

    // Idempotent: a re-delivered order.placed event must not create a second
    // entitlement for the same order and file.
    const existing = await service.listDownloadEntitlements({
      order_id: order.id,
      digital_file_id: files.map((file) => file.id),
    })
    const alreadyGranted = new Set(existing.map((e) => e.digital_file_id))

    const downloads: GrantedDownload[] = []
    const createdIds: string[] = []

    for (const file of files) {
      if (alreadyGranted.has(file.id)) {
        continue
      }
      const { id, token } = await service.grant({
        order_id: order.id,
        customer_id: order.customer_id,
        email: order.email,
        digital_file_id: file.id,
        max_downloads: file.max_downloads,
        expires_after_days: file.expires_after_days,
      })
      createdIds.push(id)

      const expires_at = file.expires_after_days
        ? new Date(
            Date.now() + file.expires_after_days * 24 * 60 * 60 * 1000
          ).toISOString()
        : null

      downloads.push({
        entitlement_id: id,
        token,
        title: file.title,
        file_name: file.file_name,
        max_downloads: file.max_downloads,
        expires_at,
      })
    }

    return new StepResponse({ ...empty, downloads }, createdIds)
  },
  async (createdIds, { container }) => {
    if (!createdIds?.length) {
      return
    }
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    await service.deleteDownloadEntitlements(createdIds)
  }
)
