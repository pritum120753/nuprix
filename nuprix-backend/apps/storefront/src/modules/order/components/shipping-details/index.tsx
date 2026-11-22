import { convertToLocale } from "@lib/util/money"
import { getCartDeliverySplit } from "@lib/util/product"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Heading, Text } from "@modules/common/components/ui"
import type { VendorFulfillmentGroup } from "@lib/data/orders"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
  vendorFulfillmentGroups?: VendorFulfillmentGroup[]
}

type OrderFulfillmentLabel = {
  id?: string
  tracking_number?: string | null
  tracking_url?: string | null
}

type OrderFulfillment = {
  id: string
  shipped_at?: string | Date | null
  delivered_at?: string | Date | null
  canceled_at?: string | Date | null
  labels?: OrderFulfillmentLabel[] | null
}

function safeTrackingUrl(raw?: string | null): string | null {
  if (!raw) {
    return null
  }
  try {
    const parsed = new URL(raw)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? parsed.toString()
      : null
  } catch {
    return null
  }
}

const ShippingDetails = ({
  order,
  vendorFulfillmentGroups = [],
}: ShippingDetailsProps) => {
  const { isDigitalOnly } = getCartDeliverySplit(order.items)
  const fulfillments = (
    (order as unknown as { fulfillments?: OrderFulfillment[] }).fulfillments ??
    []
  ).filter((f) => !f.canceled_at)

  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        Delivery
      </Heading>
      {isDigitalOnly ? (
        <div
          className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4 text-sm text-nuprix-muted"
          data-testid="digital-delivery-summary"
        >
          Digital-only order — no physical shipment required. Access your files
          from your Account Downloads library once payment is confirmed.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 small:flex-row small:items-start small:gap-x-8">
            <div
              className="flex flex-col small:w-1/3"
              data-testid="shipping-address-summary"
            >
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Shipping Address
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {order.shipping_address?.first_name}{" "}
                {order.shipping_address?.last_name}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {order.shipping_address?.address_1}{" "}
                {order.shipping_address?.address_2}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {order.shipping_address?.postal_code},{" "}
                {order.shipping_address?.city}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {order.shipping_address?.country_code?.toUpperCase()}
              </Text>
            </div>

            <div
              className="flex flex-col small:w-1/3"
              data-testid="shipping-contact-summary"
            >
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Contact
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {order.shipping_address?.phone}
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {order.email}
              </Text>
            </div>

            <div
              className="flex flex-col small:w-1/3"
              data-testid="shipping-method-summary"
            >
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Method
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">
                {(order.shipping_methods?.[0] as { name?: string })?.name} (
                {convertToLocale({
                  amount: order.shipping_methods?.[0]?.total ?? 0,
                  currency_code: order.currency_code,
                })}
                )
              </Text>
            </div>
          </div>

          {vendorFulfillmentGroups.length > 0 && (
            <div
              className="mt-6 space-y-3"
              data-testid="vendor-fulfillment-groups"
            >
              <Text className="txt-medium-plus text-ui-fg-base">
                Vendor Shipments
              </Text>
              {vendorFulfillmentGroups.map((group) => {
                const statusLabel =
                  group.status === "delivered"
                    ? "Delivered"
                    : group.status === "shipped"
                      ? "Shipped"
                      : group.status === "processing"
                        ? "Processing"
                        : group.status === "exception"
                          ? "Exception"
                          : group.status === "canceled"
                            ? "Canceled"
                            : "Preparing"
                const safeUrl =
                  group.tracking_url?.startsWith("https://")
                    ? group.tracking_url
                    : null

                return (
                  <div
                    key={group.id}
                    className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <Text className="txt-medium-plus text-nuprix-forest">
                          {group.vendor_name || "Marketplace Vendor"}
                        </Text>
                        <Text className="txt-medium text-nuprix-muted">
                          {statusLabel}
                        </Text>
                      </div>
                      {group.carrier && (
                        <Text className="text-xs text-nuprix-muted">
                          Carrier: {group.carrier}
                        </Text>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-nuprix-muted">
                      Tracking:{" "}
                      <span className="font-mono text-nuprix-ink">
                        {group.tracking_number || "Pending"}
                      </span>
                      {safeUrl && (
                        <>
                          {" "}(<a
                            href={safeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-nuprix-pine underline underline-offset-2"
                          >Track package</a>)
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div
            className="mt-6 rounded-lg border border-nuprix-line bg-nuprix-ivory p-4 space-y-2"
            data-testid="shipment-tracking-summary"
          >
            <Text className="txt-medium-plus text-ui-fg-base">
              Shipment & Tracking
            </Text>
            {fulfillments.length === 0 ? (
              <Text className="txt-medium text-ui-fg-subtle">
                Preparing shipment — tracking details will appear here once
                dispatched.
              </Text>
            ) : (
              <ul className="space-y-2 text-sm text-nuprix-muted">
                {fulfillments.map((fulfillment) => {
                  const statusLabel = fulfillment.delivered_at
                    ? "Delivered"
                    : fulfillment.shipped_at
                      ? "Shipped"
                      : "Packed / awaiting carrier scan"
                  const labels = fulfillment.labels ?? []

                  return (
                    <li
                      key={fulfillment.id}
                      className="flex flex-col gap-1 border-t border-nuprix-line pt-2 first:border-t-0 first:pt-0"
                    >
                      <span className="font-medium text-nuprix-forest">
                        {statusLabel}
                        {fulfillment.shipped_at
                          ? ` · ${new Date(
                              fulfillment.shipped_at
                            ).toLocaleDateString()}`
                          : ""}
                      </span>
                      {labels.length > 0 ? (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                          {labels.map((label, idx) => {
                            const safeUrl = safeTrackingUrl(label.tracking_url)
                            return (
                              <span key={label.id ?? idx}>
                                Tracking:{" "}
                                <span className="font-mono text-nuprix-ink">
                                  {label.tracking_number || "Pending"}
                                </span>
                                {safeUrl && (
                                  <>
                                    {" "}
                                    (
                                    <a
                                      href={safeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-nuprix-pine underline underline-offset-2 hover:text-nuprix-forest"
                                    >
                                      Track package
                                    </a>
                                    )
                                  </>
                                )}
                              </span>
                            )
                          })}
                        </div>
                      ) : (
                        <span className="text-xs text-nuprix-muted">
                          Tracking number not yet assigned.
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails
