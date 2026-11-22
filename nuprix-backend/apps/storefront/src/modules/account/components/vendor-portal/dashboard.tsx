"use client"

import {
  applyAsVendor,
  inviteVendorMember,
  removeVendorMember,
  requestVendorPayout,
  submitVendorProduct,
  updateVendorMemberRole,
  updateVendorFulfillment,
  type MyVendorProfile,
  type VendorEarningsResponse,
  type VendorMemberItem,
  type VendorFulfillmentOrder,
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
  members: VendorMemberItem[]
  vendorOrders: VendorFulfillmentOrder[]
  customerEmail?: string | null
}

type Tab = "overview" | "orders" | "products" | "payouts" | "team"
type PayoutMethod = "bank_transfer" | "bkash" | "nagad" | "rocket"

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
  members,
  vendorOrders,
  customerEmail,
}: DashboardProps) {
  const router = useRouter()
  const currencyCode = earnings?.balance.currency_code ?? "bdt"
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [payoutMethod, setPayoutMethod] =
    useState<PayoutMethod>("bank_transfer")
  const [payoutCurrency, setPayoutCurrency] = useState(currencyCode)
  const [applyState, applyAction] = useActionState(applyAsVendor, null)
  const [productState, productAction] = useActionState(submitVendorProduct, null)
  const [payoutState, payoutAction] = useActionState(requestVendorPayout, null)
  const [inviteState, inviteAction] = useActionState(inviteVendorMember, null)
  const [teamError, setTeamError] = useState<string | null>(null)
  const [teamBusyId, setTeamBusyId] = useState<string | null>(null)
  const [fulfillmentError, setFulfillmentError] = useState<string | null>(null)
  const [fulfillmentBusyId, setFulfillmentBusyId] = useState<string | null>(null)
  const [fulfillmentDraft, setFulfillmentDraft] = useState<Record<string, {
    status: VendorFulfillmentOrder["status"]
    carrier: string
    tracking_number: string
    tracking_url: string
  }>>({})
  const { state: payoutModalOpen, open: openPayoutModal, close: closePayoutModal } =
    useToggleState(false)
  const productFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (applyState?.success || productState?.success || payoutState?.success || inviteState?.success) {
      router.refresh()
    }
  }, [applyState?.success, productState?.success, payoutState?.success, inviteState?.success, router])

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

  const changeMemberRole = async (
    memberId: string,
    role: "owner" | "staff"
  ) => {
    setTeamBusyId(memberId)
    setTeamError(null)
    const result = await updateVendorMemberRole(memberId, role)
    if (result.success) {
      router.refresh()
    } else {
      setTeamError(result.error ?? "Could not update team member.")
    }
    setTeamBusyId(null)
  }

  const removeMember = async (member: VendorMemberItem) => {
    if (!window.confirm(`Remove ${member.email} from the vendor team?`)) {
      return
    }
    setTeamBusyId(member.id)
    setTeamError(null)
    const result = await removeVendorMember(member.id)
    if (result.success) {
      router.refresh()
    } else {
      setTeamError(result.error ?? "Could not remove team member.")
    }
    setTeamBusyId(null)
  }

  const saveFulfillment = async (order: VendorFulfillmentOrder) => {
    const draft = fulfillmentDraft[order.id]
    setFulfillmentBusyId(order.id)
    setFulfillmentError(null)
    const result = await updateVendorFulfillment(order.order_id, {
      status: draft?.status ?? order.status,
      carrier: draft?.carrier?.trim() || null,
      tracking_number: draft?.tracking_number?.trim() || null,
      tracking_url: draft?.tracking_url?.trim() || null,
    })
    if (result.success) {
      router.refresh()
    } else {
      setFulfillmentError(result.error ?? "Could not update fulfillment.")
    }
    setFulfillmentBusyId(null)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: `Orders (${vendorOrders.length})` },
    { id: "products", label: `Products (${products.length})` },
    { id: "payouts", label: `Payouts (${payouts.length})` },
    ...(profile.role === "owner"
      ? [{ id: "team" as Tab, label: `Team (${members.length})` }]
      : []),
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

          {activeTab === "orders" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-xl text-nuprix-forest">Vendor orders</h2>
                <p className="mt-1 text-xs text-nuprix-muted">Manage fulfillment and tracking for orders containing your products.</p>
              </div>

              {fulfillmentError && <ErrorMessage error={fulfillmentError} />}

              {vendorOrders.length === 0 ? (
                <EmptyState title="No vendor fulfillment groups" description="Orders containing your products will appear here." />
              ) : (
                <div className="space-y-4">
                  {vendorOrders.map((order) => {
                    const draft = fulfillmentDraft[order.id]
                    return (
                      <section key={order.id} className="rounded-lg border border-nuprix-line bg-nuprix-paper p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs text-nuprix-muted">Order</p>
                            <p className="font-mono text-sm text-nuprix-ink">{order.order_id}</p>
                          </div>
                          <Badge color={order.status === "delivered" ? "green" : order.status === "exception" || order.status === "canceled" ? "red" : "blue"}>
                            {order.status}
                          </Badge>
                        </div>

                        <div className="mt-4 grid gap-3 small:grid-cols-2">
                          <Field label="Status" htmlFor={`fulfillment-status-${order.id}`}>
                            <select
                              id={`fulfillment-status-${order.id}`}
                              value={draft?.status ?? order.status}
                              onChange={(event) => setFulfillmentDraft((prev) => ({
                                ...prev,
                                [order.id]: {
                                  status: event.target.value as VendorFulfillmentOrder["status"],
                                  carrier: draft?.carrier ?? order.carrier ?? "",
                                  tracking_number: draft?.tracking_number ?? order.tracking_number ?? "",
                                  tracking_url: draft?.tracking_url ?? order.tracking_url ?? "",
                                },
                              }))}
                              className="portal-input"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="canceled">Canceled</option>
                              <option value="exception">Exception</option>
                            </select>
                          </Field>
                          <Field label="Carrier" htmlFor={`fulfillment-carrier-${order.id}`}>
                            <input
                              id={`fulfillment-carrier-${order.id}`}
                              value={draft?.carrier ?? order.carrier ?? ""}
                              onChange={(event) => setFulfillmentDraft((prev) => ({
                                ...prev,
                                [order.id]: {
                                  status: draft?.status ?? order.status,
                                  carrier: event.target.value,
                                  tracking_number: draft?.tracking_number ?? order.tracking_number ?? "",
                                  tracking_url: draft?.tracking_url ?? order.tracking_url ?? "",
                                },
                              }))}
                              className="portal-input"
                            />
                          </Field>
                          <Field label="Tracking number" htmlFor={`fulfillment-number-${order.id}`}>
                            <input
                              id={`fulfillment-number-${order.id}`}
                              value={draft?.tracking_number ?? order.tracking_number ?? ""}
                              onChange={(event) => setFulfillmentDraft((prev) => ({
                                ...prev,
                                [order.id]: {
                                  status: draft?.status ?? order.status,
                                  carrier: draft?.carrier ?? order.carrier ?? "",
                                  tracking_number: event.target.value,
                                  tracking_url: draft?.tracking_url ?? order.tracking_url ?? "",
                                },
                              }))}
                              className="portal-input"
                            />
                          </Field>
                          <Field label="Tracking URL (HTTPS)" htmlFor={`fulfillment-url-${order.id}`}>
                            <input
                              id={`fulfillment-url-${order.id}`}
                              type="url"
                              placeholder="https://carrier.example/track/..."
                              value={draft?.tracking_url ?? order.tracking_url ?? ""}
                              onChange={(event) => setFulfillmentDraft((prev) => ({
                                ...prev,
                                [order.id]: {
                                  status: draft?.status ?? order.status,
                                  carrier: draft?.carrier ?? order.carrier ?? "",
                                  tracking_number: draft?.tracking_number ?? order.tracking_number ?? "",
                                  tracking_url: event.target.value,
                                },
                              }))}
                              className="portal-input"
                            />
                          </Field>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button
                            size="large"
                            disabled={fulfillmentBusyId === order.id}
                            onClick={() => void saveFulfillment(order)}
                          >
                            Save fulfillment
                          </Button>
                        </div>
                      </section>
                    )
                  })}
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
                    <table className="w-full min-w-[700px] text-left text-sm">
                      <thead className="bg-nuprix-mist text-xs text-nuprix-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Amount</th>
                          <th className="px-4 py-3 font-semibold">Method</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold">Reference</th>
                          <th className="px-4 py-3 font-semibold">Requested</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-nuprix-line bg-white">
                        {payouts.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4 font-semibold text-nuprix-forest">{formatAmount(item.amount, item.currency_code)}</td>
                            <td className="px-4 py-4 text-nuprix-muted">
                              {item.payout_method === "bank_transfer"
                                ? "Bank transfer"
                                : item.payout_method === "bkash"
                                  ? "bKash"
                                  : item.payout_method
                                    ? item.payout_method[0].toUpperCase() + item.payout_method.slice(1)
                                    : "—"}
                            </td>
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

          {activeTab === "team" && profile.role === "owner" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-xl text-nuprix-forest">Team & staff</h2>
                <p className="mt-1 text-xs text-nuprix-muted">Only vendor owners can invite, change roles, or remove team members.</p>
              </div>

              <form action={inviteAction} className="rounded-lg border border-nuprix-line bg-nuprix-paper p-4">
                <div className="grid gap-3 small:grid-cols-[1fr_140px_auto] small:items-end">
                  <Field label="Customer email" htmlFor="vendor-member-email">
                    <input id="vendor-member-email" name="email" type="email" required placeholder="staff@example.com" className="portal-input" />
                  </Field>
                  <Field label="Role" htmlFor="vendor-member-role">
                    <select id="vendor-member-role" name="role" defaultValue="staff" className="portal-input">
                      <option value="staff">Staff</option>
                      <option value="owner">Owner</option>
                    </select>
                  </Field>
                  <SubmitButton className="min-h-[44px] px-5">Invite member</SubmitButton>
                </div>
                <ErrorMessage error={inviteState?.error} />
                {inviteState?.success && (
                  <p className="mt-3 text-sm text-nuprix-moss">Team member added.</p>
                )}
              </form>

              {teamError && <ErrorMessage error={teamError} />}

              {members.length === 0 ? (
                <EmptyState title="No team members" description="Invite an existing Nuprix customer to join this vendor team." />
              ) : (
                <div className="overflow-hidden rounded-lg border border-nuprix-line">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left text-sm">
                      <thead className="bg-nuprix-mist text-xs text-nuprix-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Member</th>
                          <th className="px-4 py-3 font-semibold">Role</th>
                          <th className="px-4 py-3 font-semibold">Added</th>
                          <th className="px-4 py-3 text-right font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-nuprix-line bg-white">
                        {members.map((member) => (
                          <tr key={member.id}>
                            <td className="px-4 py-4 text-nuprix-ink">{member.email}</td>
                            <td className="px-4 py-4">
                              <select
                                aria-label={`Role for ${member.email}`}
                                value={member.role}
                                disabled={teamBusyId === member.id}
                                onChange={(event) =>
                                  void changeMemberRole(
                                    member.id,
                                    event.target.value as "owner" | "staff"
                                  )
                                }
                                className="min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 text-sm"
                              >
                                <option value="staff">Staff</option>
                                <option value="owner">Owner</option>
                              </select>
                            </td>
                            <td className="px-4 py-4 text-nuprix-muted">{formatDate(member.created_at)}</td>
                            <td className="px-4 py-4 text-right">
                              <button
                                type="button"
                                disabled={teamBusyId === member.id}
                                onClick={() => void removeMember(member)}
                                className="min-h-[44px] text-sm font-semibold text-nuprix-danger hover:underline"
                              >
                                Remove
                              </button>
                            </td>
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
                  <Field label="Payout method" htmlFor="payout-method">
                    <select
                      id="payout-method"
                      name="payout_method"
                      value={payoutMethod}
                      onChange={(event) => {
                        const method = event.target.value
                        if (
                          method === "bank_transfer" ||
                          method === "bkash" ||
                          method === "nagad" ||
                          method === "rocket"
                        ) {
                          setPayoutMethod(method)
                          if (method !== "bank_transfer") {
                            setPayoutCurrency("bdt")
                          }
                        }
                      }}
                      className="portal-input"
                    >
                      <option value="bank_transfer">Bank transfer</option>
                      <option value="bkash">bKash</option>
                      <option value="nagad">Nagad</option>
                      <option value="rocket">Rocket</option>
                    </select>
                  </Field>
                  {payoutMethod === "bank_transfer" ? (
                    <div className="space-y-4">
                      <Field label="Bank name" htmlFor="payout-bank-name">
                        <input
                          id="payout-bank-name"
                          name="bank_name"
                          type="text"
                          maxLength={120}
                          required
                          className="portal-input"
                        />
                      </Field>
                      <Field label="Account holder name" htmlFor="payout-account-name">
                        <input
                          id="payout-account-name"
                          name="account_name"
                          type="text"
                          maxLength={120}
                          required
                          className="portal-input"
                        />
                      </Field>
                      <Field label="Account number" htmlFor="payout-account-number">
                        <input
                          id="payout-account-number"
                          name="account_number"
                          type="text"
                          maxLength={120}
                          required
                          className="portal-input"
                        />
                      </Field>
                    </div>
                  ) : (
                    <Field label="Bangladesh mobile number" htmlFor="payout-mobile-number">
                      <input
                        id="payout-mobile-number"
                        name="mobile_number"
                        type="tel"
                        inputMode="numeric"
                        pattern="01[3-9][0-9]{8}"
                        title="Enter an 11-digit Bangladesh mobile number beginning with 013–019."
                        maxLength={11}
                        required
                        className="portal-input"
                      />
                    </Field>
                  )}
                  <div className="grid grid-cols-1 gap-3 xsmall:grid-cols-[1fr_120px]">
                    <Field label="Amount (minor units)" htmlFor="payout-amount">
                      <input id="payout-amount" name="amount" type="number" min={1} required className="portal-input" />
                    </Field>
                    <Field label="Currency" htmlFor="payout-currency">
                      <select
                        id="payout-currency"
                        name="currency_code"
                        value={payoutCurrency}
                        onChange={(event) => setPayoutCurrency(event.target.value)}
                        className="portal-input"
                      >
                        <option value="bdt">BDT</option>
                        {payoutMethod === "bank_transfer" && (
                          <>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                          </>
                        )}
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
