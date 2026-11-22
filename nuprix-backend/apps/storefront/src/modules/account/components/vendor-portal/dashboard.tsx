"use client"

import {
  applyAsVendor,
  requestVendorPayout,
  submitVendorProduct,
  type MyVendorProfile,
  type VendorEarningsResponse,
  type VendorPayoutItem,
  type VendorProductItem,
} from "@lib/data/vendors"
import useToggleState from "@lib/hooks/use-toggle-state"
import { convertToLocale } from "@lib/util/money"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Modal from "@modules/common/components/modal"
import { Badge, Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useRef, useState } from "react"

type DashboardProps = {
  profile: MyVendorProfile | null
  products: VendorProductItem[]
  earnings: VendorEarningsResponse | null
  payouts: VendorPayoutItem[]
  customerEmail?: string | null
}

type Tab = "overview" | "products" | "payouts"

const statusCopy = {
  pending: "Your application is under review. Product submissions and payout requests unlock after verification.",
  suspended: "Your seller account is suspended. Contact support before submitting products or requesting payouts.",
}

const approvalColors = {
  draft: "grey",
  pending_review: "orange",
  approved: "green",
  rejected: "red",
} as const

const payoutColors = {
  requested: "orange",
  approved: "blue",
  paid: "green",
  rejected: "red",
} as const

export default function VendorDashboard({
  profile,
  products,
  earnings,
  payouts,
  customerEmail,
}: DashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [applyState, applyAction] = useActionState(applyAsVendor, null)
  const [productState, productAction] = useActionState(submitVendorProduct, null)
  const [payoutState, payoutAction] = useActionState(requestVendorPayout, null)
  const { state: payoutModalOpen, open: openPayoutModal, close: closePayoutModal } =
    useToggleState(false)
  const productFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (applyState?.success || productState?.success || payoutState?.success) {
      router.refresh()
    }
  }, [applyState?.success, productState?.success, payoutState?.success, router])

  useEffect(() => {
    if (productState?.success) {
      productFormRef.current?.reset()
    }
  }, [productState?.success])

  useEffect(() => {
    if (payoutState?.success) {
      closePayoutModal()
    }
  }, [payoutState?.success, closePayoutModal])

  if (!profile) {
    return (
      <div className="space-y-6" data-testid="vendor-apply-section">
        <div>
          <p className="eyebrow">Seller Network</p>
          <h1 className="heading-display mt-2 text-3xl">Become a Nuprix seller</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-nuprix-muted">
            Apply to open a verified store, submit products for review, and manage
            marketplace payouts.
          </p>
        </div>

        <form action={applyAction} className="max-w-2xl space-y-5">
          <div className="grid gap-4 small:grid-cols-2">
            <Field label="Store name" htmlFor="vendor-name">
              <input id="vendor-name" name="name" required minLength={2} className="portal-input" />
            </Field>
            <Field label="Store handle" htmlFor="vendor-handle">
              <input id="vendor-handle" name="handle" placeholder="studio-nuprix" className="portal-input" />
            </Field>
          </div>
          <Field label="Contact email" htmlFor="vendor-email">
            <input id="vendor-email" name="contact_email" type="email" required defaultValue={customerEmail ?? ""} className="portal-input" />
          </Field>
          <Field label="About your store" htmlFor="vendor-description">
            <textarea id="vendor-description" name="description" rows={4} className="portal-input resize-y" />
          </Field>
          <ErrorMessage error={applyState?.error} />
          {applyState?.success && (
            <p className="rounded-md border border-nuprix-line-strong bg-nuprix-sage px-4 py-3 text-sm text-nuprix-pine">
              Application submitted. The review team will update your verification status.
            </p>
          )}
          <SubmitButton className="min-h-[44px] px-6">Submit seller application</SubmitButton>
        </form>
      </div>
    )
  }

  const { vendor } = profile
  const isVerified = vendor.status === "verified"
  const currencyCode = earnings?.balance.currency_code ?? "bdt"

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "products", label: `Products (${products.length})` },
    { id: "payouts", label: `Payouts (${payouts.length})` },
  ]

  return (
    <div className="space-y-6" data-testid="vendor-dashboard">
      <div className="flex flex-col gap-4 border-b border-nuprix-line pb-5 small:flex-row small:items-end small:justify-between">
        <div>
          <p className="eyebrow">Seller Dashboard</p>
          <h1 className="heading-display mt-2 text-3xl">{vendor.name}</h1>
          <p className="mt-1 text-xs text-nuprix-muted">
            @{vendor.handle} · {profile.role === "owner" ? "Store owner" : "Store staff"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge color={isVerified ? "green" : vendor.status === "suspended" ? "red" : "blue"}>
            {vendor.status.replace("_", " ")}
          </Badge>
          {isVerified && (
            <LocalizedClientLink
              href={`/vendors/${vendor.handle}`}
              className="text-xs font-semibold text-nuprix-pine underline underline-offset-4"
            >
              View store
            </LocalizedClientLink>
          )}
        </div>
      </div>

      {!isVerified && (
        <div className="rounded-lg border border-nuprix-line-strong bg-nuprix-mist px-4 py-3 text-sm text-nuprix-charcoal">
          {statusCopy[vendor.status as keyof typeof statusCopy]}
        </div>
      )}

      {isVerified && (
        <div className="grid grid-cols-2 gap-3 small:grid-cols-4">
          <SummaryCard label="Available" value={formatAmount(earnings?.balance.available_balance, currencyCode)} tone="forest" />
          <SummaryCard label="Pending" value={formatAmount(earnings?.balance.pending_net, currencyCode)} />
          <SummaryCard label="Reserved" value={formatAmount(earnings?.balance.reserved_payouts, currencyCode)} />
          <SummaryCard label="Paid total" value={formatAmount(earnings?.balance.paid_total, currencyCode)} tone="forest" />
        </div>
      )}

      {isVerified && (
        <>
          <nav className="no-scrollbar flex overflow-x-auto border-b border-nuprix-line" aria-label="Vendor dashboard sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] whitespace-nowrap border-b-2 px-4 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-nuprix-forest text-nuprix-forest"
                    : "border-transparent text-nuprix-muted hover:text-nuprix-pine"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {activeTab === "overview" && (
            <div className="grid gap-4 small:grid-cols-2">
              <SectionCard
                title="Product submissions"
                description="Submit an existing catalog product for marketplace review."
                action={<button type="button" onClick={() => setActiveTab("products")} className="link-underline text-xs">Manage products</button>}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-nuprix-muted">Submitted</p>
                    <p className="mt-1 text-2xl font-semibold text-nuprix-forest">{products.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-nuprix-muted">Approved</p>
                    <p className="mt-1 text-lg font-semibold text-nuprix-moss">
                      {products.filter((item) => item.approval_status === "approved").length}
                    </p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                title="Payout balance"
                description="Request a payout from your available vendor balance."
                action={<button type="button" onClick={openPayoutModal} className="link-underline text-xs">Request payout</button>}
              >
                <p className="text-xs text-nuprix-muted">Available balance</p>
                <p className="mt-1 text-2xl font-semibold text-nuprix-forest">
                  {formatAmount(earnings?.balance.available_balance, currencyCode)}
                </p>
              </SectionCard>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 small:flex-row small:items-end small:justify-between">
                <div>
                  <h2 className="font-display text-xl text-nuprix-forest">Product submissions</h2>
                  <p className="mt-1 text-xs text-nuprix-muted">Track review status and submission details.</p>
                </div>
              </div>

              <form ref={productFormRef} action={productAction} className="rounded-lg border border-nuprix-line bg-nuprix-paper p-4">
                <div className="grid gap-3 small:grid-cols-[1fr_auto] small:items-end">
                  <Field label="Catalog product ID" htmlFor="vendor-product-id">
                    <input id="vendor-product-id" name="product_id" required placeholder="prod_..." className="portal-input" />
                  </Field>
                  <SubmitButton className="min-h-[44px] px-5">Submit for review</SubmitButton>
                </div>
                <ErrorMessage error={productState?.error} />
                {productState?.success && <p className="mt-3 text-sm text-nuprix-moss">Product submitted for review.</p>}
              </form>

              {products.length === 0 ? (
                <EmptyState title="No product submissions" description="Submit a catalog product ID to begin the review process." />
              ) : (
                <div className="overflow-hidden rounded-lg border border-nuprix-line">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left text-sm">
                      <thead className="bg-nuprix-mist text-xs text-nuprix-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Product ID</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold">Submitted</th>
                          <th className="px-4 py-3 font-semibold">Review note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-nuprix-line bg-white">
                        {products.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4 font-mono text-xs text-nuprix-ink">{item.product_id}</td>
                            <td className="px-4 py-4"><Badge color={approvalColors[item.approval_status]}>{item.approval_status.replace("_", " ")}</Badge></td>
                            <td className="px-4 py-4 text-nuprix-muted">{formatDate(item.created_at)}</td>
                            <td className="px-4 py-4 text-nuprix-muted">{item.rejection_reason || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "payouts" && (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 small:flex-row small:items-end small:justify-between">
                <div>
                  <h2 className="font-display text-xl text-nuprix-forest">Payout history</h2>
                  <p className="mt-1 text-xs text-nuprix-muted">Review requested, approved, paid, and rejected payouts.</p>
                </div>
                <Button size="large" onClick={openPayoutModal}>Request payout</Button>
              </div>

              {payouts.length === 0 ? (
                <EmptyState title="No payout requests" description="Request a payout when you have an available balance." />
              ) : (
                <div className="overflow-hidden rounded-lg border border-nuprix-line">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left text-sm">
                      <thead className="bg-nuprix-mist text-xs text-nuprix-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Amount</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold">Reference</th>
                          <th className="px-4 py-3 font-semibold">Requested</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-nuprix-line bg-white">
                        {payouts.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4 font-semibold text-nuprix-forest">{formatAmount(item.amount, item.currency_code)}</td>
                            <td className="px-4 py-4"><Badge color={payoutColors[item.status]}>{item.status}</Badge></td>
                            <td className="px-4 py-4 font-mono text-xs text-nuprix-muted">{item.reference || "—"}</td>
                            <td className="px-4 py-4 text-nuprix-muted">{formatDate(item.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          <Modal isOpen={payoutModalOpen} close={closePayoutModal} size="small" data-testid="vendor-payout-modal">
            <Modal.Title>
              <h2 className="heading-display text-xl">Request payout</h2>
            </Modal.Title>
            <form action={payoutAction} className="mt-5 space-y-4">
              <Modal.Body>
                <div className="w-full space-y-4">
                  <div className="rounded-lg bg-nuprix-mist p-3">
                    <p className="text-xs text-nuprix-muted">Available balance</p>
                    <p className="mt-1 font-semibold text-nuprix-forest">{formatAmount(earnings?.balance.available_balance, currencyCode)}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 xsmall:grid-cols-[1fr_120px]">
                    <Field label="Amount (minor units)" htmlFor="payout-amount">
                      <input id="payout-amount" name="amount" type="number" min={1} required className="portal-input" />
                    </Field>
                    <Field label="Currency" htmlFor="payout-currency">
                      <select id="payout-currency" name="currency_code" defaultValue={currencyCode} className="portal-input">
                        <option value="bdt">BDT</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                      </select>
                    </Field>
                  </div>
                  <ErrorMessage error={payoutState?.error} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button type="button" onClick={closePayoutModal} className="min-h-[44px] px-4 text-sm font-semibold text-nuprix-muted">Cancel</button>
                <SubmitButton className="min-h-[44px] px-5">Request payout</SubmitButton>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      )}
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-nuprix-charcoal">{label}</label>
      {children}
    </div>
  )
}

function SummaryCard({ label, value, tone }: { label: string; value: string; tone?: "forest" }) {
  return (
    <div className="rounded-lg border border-nuprix-line bg-nuprix-paper p-4">
      <p className="text-xs text-nuprix-muted">{label}</p>
      <p className={`mt-2 text-lg font-semibold ${tone ? "text-nuprix-forest" : "text-nuprix-ink"}`}>{value}</p>
    </div>
  )
}

function SectionCard({ title, description, action, children }: { title: string; description: string; action: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-nuprix-line bg-nuprix-paper p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg text-nuprix-forest">{title}</h2>
          <p className="mt-1 text-xs text-nuprix-muted">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-nuprix-line-strong bg-nuprix-paper px-6 py-10 text-center">
      <p className="font-display text-lg text-nuprix-forest">{title}</p>
      <p className="mt-1 text-sm text-nuprix-muted">{description}</p>
    </div>
  )
}

function formatAmount(amount: number | null | undefined, currencyCode: string) {
  return convertToLocale({
    amount: amount ?? 0,
    currency_code: currencyCode,
  })
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date)
}
