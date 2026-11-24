import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { MapPin, UserRound } from "lucide-react"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="w-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 pb-4 border-b border-nuprix-line">
          <h1 className="text-3xl font-display font-medium tracking-[-0.03em] text-nuprix-forest" data-testid="welcome-message">
            Welcome back, {customer?.first_name || "Customer"}
          </h1>
          <span className="text-xs text-nuprix-muted">
            Signed in as:{" "}
            <span
              className="font-medium text-nuprix-forest"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>

        <div className="flex flex-col py-4">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="surface-card p-5">
              <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-nuprix-leaf">
                Profile
              </h3>
                <UserRound className="h-4 w-4 text-nuprix-moss" aria-hidden="true" />
              </div>
              <div className="flex items-baseline gap-x-2">
                <span
                  className="text-3xl font-bold text-nuprix-forest"
                  data-testid="customer-profile-completion"
                  data-value={getProfileCompletion(customer)}
                >
                  {getProfileCompletion(customer)}%
                </span>
                <span className="text-xs text-nuprix-muted uppercase tracking-wider">
                  Complete
                </span>
              </div>
            </div>

            <div className="surface-card p-5">
              <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-nuprix-leaf">
                Addresses
              </h3>
                <MapPin className="h-4 w-4 text-nuprix-moss" aria-hidden="true" />
              </div>
              <div className="flex items-baseline gap-x-2">
                <span
                  className="text-3xl font-bold text-nuprix-forest"
                  data-testid="addresses-count"
                  data-value={customer?.addresses?.length || 0}
                >
                  {customer?.addresses?.length || 0}
                </span>
                <span className="text-xs text-nuprix-muted uppercase tracking-wider">
                  Saved
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <h3 className="text-lg font-semibold text-nuprix-forest">Recent Orders</h3>
            <ul
              className="flex flex-col gap-y-3"
              data-testid="orders-wrapper"
            >
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => {
                  return (
                    <li
                      key={order.id}
                      data-testid="order-wrapper"
                      data-value={order.id}
                    >
                      {/* Fixed: Valid HTML without interactive <button> nested inside <a> */}
                      <LocalizedClientLink
                        href={`/account/orders/details/${order.id}`}
                        className="surface-card flex justify-between items-center p-4 hover:border-nuprix-moss/40 transition-colors group"
                      >
                        <div className="grid grid-cols-3 text-xs gap-x-4 flex-1">
                          <div>
                            <span className="block text-nuprix-muted">Date</span>
                            <span className="font-medium text-nuprix-forest mt-0.5 block" data-testid="order-created-date">
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="block text-nuprix-muted">Order</span>
                            <span
                              className="font-medium text-nuprix-forest mt-0.5 block"
                              data-testid="order-id"
                              data-value={order.display_id}
                            >
                              #{order.display_id}
                            </span>
                          </div>
                          <div>
                            <span className="block text-nuprix-muted">Total</span>
                            <span className="font-semibold text-nuprix-forest mt-0.5 block" data-testid="order-amount">
                              {convertToLocale({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3 text-nuprix-muted group-hover:text-nuprix-forest transition-colors">
                          <ChevronDown className="-rotate-90" size={16} />
                        </div>
                      </LocalizedClientLink>
                    </li>
                  )
                })
              ) : (
                <div className="surface-card p-6 text-center text-sm text-nuprix-muted" data-testid="no-orders-message">
                  No orders placed yet.
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0
  if (!customer) return 0
  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++
  const billingAddress = customer.addresses?.find((addr) => addr.is_default_billing)
  if (billingAddress) count++
  return (count / 4) * 100
}

export default Overview
