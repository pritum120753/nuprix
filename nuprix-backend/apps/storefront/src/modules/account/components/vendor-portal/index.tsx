"use client"

import {
  applyAsVendor,
  requestVendorPayout,
  submitVendorProduct,
  type MyVendorProfile,
  type VendorEarningsResponse,
  type VendorProductItem,
} from "@lib/data/vendors"
import { convertToLocale } from "@lib/util/money"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { Badge } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

type VendorPortalProps = {
  profile: MyVendorProfile | null
  products: VendorProductItem[]
  earnings: VendorEarningsResponse | null
  customerEmail?: string | null
}

const VendorPortal = ({
  profile,
  products,
  earnings,
  customerEmail,
}: VendorPortalProps) => {
  const router = useRouter()
  const [applyState, applyAction] = useActionState(applyAsVendor, null)
  const [productState, productAction] = useActionState(
    submitVendorProduct,
    null
  )
  const [payoutState, payoutAction] = useActionState(requestVendorPayout, null)

  useEffect(() => {
    if (applyState?.success || productState?.success || payoutState?.success) {
      router.refresh()
    }
  }, [
    applyState?.success,
    productState?.success,
    payoutState?.success,
    router,
  ])

  if (!profile) {
    return (
      <div className="space-y-6" data-testid="vendor-apply-section">
        <div>
          <h1 className="text-2xl font-display font-medium text-nuprix-forest">
            Seller Portal
          </h1>
          <p className="mt-1 text-sm text-nuprix-muted">
            Apply to open a verified seller store on Nuprix and manage your
            listings and payouts.
          </p>
        </div>

        <form action={applyAction} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <label
              htmlFor="vendor-name"
              className="block text-xs font-semibold text-nuprix-forest"
            >
              Store name *
            </label>
            <input
              id="vendor-name"
              name="name"
              type="text"
              required
              minLength={2}
              className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="vendor-handle"
              className="block text-xs font-semibold text-nuprix-forest"
            >
              Store handle (optional)
            </label>
            <input
              id="vendor-handle"
              name="handle"
              type="text"
              placeholder="e.g. studio-nuprix"
              className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="vendor-email"
              className="block text-xs font-semibold text-nuprix-forest"
            >
              Contact email *
            </label>
            <input
              id="vendor-email"
              name="contact_email"
              type="email"
              required
              defaultValue={customerEmail ?? ""}
              className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="vendor-description"
              className="block text-xs font-semibold text-nuprix-forest"
            >
              About your store (optional)
            </label>
            <textarea
              id="vendor-description"
              name="description"
              rows={3}
              className="w-full rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
            />
          </div>

          <ErrorMessage error={applyState?.error} />
          <SubmitButton className="min-h-[44px] px-6">
            Submit seller application
          </SubmitButton>
        </form>
      </div>
    )
  }

  const { vendor } = profile
  const currencyCode = earnings?.balance.currency_code ?? "bdt"

  return (
    <div className="space-y-8" data-testid="vendor-dashboard">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-nuprix-line pb-4">
        <div>
          <h1 className="text-2xl font-display font-medium text-nuprix-forest">
            {vendor.name}
          </h1>
          <p className="text-xs text-nuprix-muted mt-1">
            Handle: <span className="font-mono">{vendor.handle}</span> · Role:{" "}
            {profile.role}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge color={vendor.status === "verified" ? "green" : "blue"}>
            {vendor.status.toUpperCase()}
          </Badge>
          {vendor.status === "verified" && (
            <LocalizedClientLink
              href={`/vendors/${vendor.handle}`}
              className="text-xs font-semibold text-nuprix-pine hover:text-nuprix-forest underline underline-offset-4"
            >
              View public store →
            </LocalizedClientLink>
          )}
        </div>
      </div>

      {vendor.status !== "verified" ? (
        <div className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4 text-sm text-nuprix-muted">
          {vendor.status === "pending"
            ? "Your seller application is pending admin verification. Once verified, you can submit products and request payouts here."
            : "Your seller store is currently suspended. Please contact support for details."}
        </div>
      ) : (
        <>
          {earnings && (
            <div className="grid grid-cols-2 gap-4 small:grid-cols-4">
              <div className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4">
                <span className="block text-xs text-nuprix-muted">
                  Available
                </span>
                <span className="mt-1 block text-lg font-semibold text-nuprix-forest">
                  {convertToLocale({
                    amount: earnings.balance.available_balance,
                    currency_code: currencyCode,
                  })}
                </span>
              </div>
              <div className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4">
                <span className="block text-xs text-nuprix-muted">Pending</span>
                <span className="mt-1 block text-lg font-semibold text-nuprix-ink">
                  {convertToLocale({
                    amount: earnings.balance.pending_net,
                    currency_code: currencyCode,
                  })}
                </span>
              </div>
              <div className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4">
                <span className="block text-xs text-nuprix-muted">
                  Reserved
                </span>
                <span className="mt-1 block text-lg font-semibold text-nuprix-ink">
                  {convertToLocale({
                    amount: earnings.balance.reserved_payouts,
                    currency_code: currencyCode,
                  })}
                </span>
              </div>
              <div className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4">
                <span className="block text-xs text-nuprix-muted">
                  Paid total
                </span>
                <span className="mt-1 block text-lg font-semibold text-nuprix-forest">
                  {convertToLocale({
                    amount: earnings.balance.paid_total,
                    currency_code: currencyCode,
                  })}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 small:grid-cols-2">
            <form
              action={productAction}
              className="rounded-lg border border-nuprix-line p-4 space-y-3"
            >
              <h2 className="text-sm font-semibold text-nuprix-forest">
                Submit Product for Review
              </h2>
              <div className="space-y-1">
                <label
                  htmlFor="vendor-product-id"
                  className="block text-xs text-nuprix-muted"
                >
                  Product ID
                </label>
                <input
                  id="vendor-product-id"
                  name="product_id"
                  type="text"
                  required
                  placeholder="prod_..."
                  className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm"
                />
              </div>
              <ErrorMessage error={productState?.error} />
              <SubmitButton className="min-h-[44px] px-4">
                Submit product
              </SubmitButton>
            </form>

            <form
              action={payoutAction}
              className="rounded-lg border border-nuprix-line p-4 space-y-3"
            >
              <h2 className="text-sm font-semibold text-nuprix-forest">
                Request Payout
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="payout-amount"
                    className="block text-xs text-nuprix-muted"
                  >
                    Amount (minor units)
                  </label>
                  <input
                    id="payout-amount"
                    name="amount"
                    type="number"
                    min={1}
                    required
                    className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="payout-currency"
                    className="block text-xs text-nuprix-muted"
                  >
                    Currency
                  </label>
                  <select
                    id="payout-currency"
                    name="currency_code"
                    defaultValue={currencyCode}
                    className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm"
                  >
                    <option value="bdt">BDT</option>
                    <option value="usd">USD</option>
                  </select>
                </div>
              </div>
              <ErrorMessage error={payoutState?.error} />
              <SubmitButton className="min-h-[44px] px-4">
                Request payout
              </SubmitButton>
            </form>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-nuprix-forest">
              Your Listings ({products.length})
            </h2>
            {products.length === 0 ? (
              <p className="text-sm text-nuprix-muted">
                No products submitted yet.
              </p>
            ) : (
              <ul className="divide-y divide-nuprix-line rounded-lg border border-nuprix-line">
                {products.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm"
                  >
                    <div>
                      <span className="font-mono text-nuprix-ink">
                        {item.product_id}
                      </span>
                      {item.rejection_reason && (
                        <p className="text-xs text-nuprix-danger mt-0.5">
                          Reason: {item.rejection_reason}
                        </p>
                      )}
                    </div>
                    <Badge
                      color={
                        item.approval_status === "approved" ? "green" : "blue"
                      }
                    >
                      {item.approval_status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default VendorPortal
