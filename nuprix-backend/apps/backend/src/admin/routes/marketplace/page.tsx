import { defineRouteConfig } from "@medusajs/admin-sdk"
import {
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Text,
} from "@medusajs/ui"
import { useCallback, useEffect, useState } from "react"

type TabKey = "vendors" | "payouts" | "support" | "audit"

type VendorRow = {
  id: string
  name: string
  handle: string
  contact_email: string
  status: "pending" | "verified" | "suspended"
  commission_rate_bps: number | null
}

type PayoutRow = {
  id: string
  vendor_id: string
  amount: number
  currency_code: string
  status: "requested" | "approved" | "paid" | "rejected"
  reference: string | null
}

type SupportRow = {
  id: string
  email: string
  order_id: string | null
  category: string
  subject: string
  message: string
  status: "open" | "in_progress" | "resolved" | "closed"
  admin_note: string | null
}

type AuditRow = {
  id: string
  actor_id: string | null
  action: string
  resource_type: string
  resource_id: string
  created_at: string
}

const MarketplaceAdminPage = () => {
  const [tab, setTab] = useState<TabKey>("vendors")
  const [vendors, setVendors] = useState<VendorRow[]>([])
  const [payouts, setPayouts] = useState<PayoutRow[]>([])
  const [tickets, setTickets] = useState<SupportRow[]>([])
  const [audits, setAudits] = useState<AuditRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [payoutRef, setPayoutRef] = useState<Record<string, string>>({})
  const [ticketNote, setTicketNote] = useState<Record<string, string>>({})

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [vRes, pRes, sRes, aRes] = await Promise.all([
        fetch("/admin/vendors", { credentials: "include" }),
        fetch("/admin/payouts", { credentials: "include" }),
        fetch("/admin/support-tickets", { credentials: "include" }),
        fetch("/admin/audit-logs?limit=50", { credentials: "include" }),
      ])

      if (!vRes.ok || !pRes.ok || !sRes.ok || !aRes.ok) {
        throw new Error("Failed to load marketplace operations data.")
      }

      const [vJson, pJson, sJson, aJson] = await Promise.all([
        vRes.json() as Promise<{ vendors?: VendorRow[] }>,
        pRes.json() as Promise<{ payouts?: PayoutRow[] }>,
        sRes.json() as Promise<{ support_tickets?: SupportRow[] }>,
        aRes.json() as Promise<{ audit_logs?: AuditRow[] }>,
      ])

      setVendors(vJson.vendors ?? [])
      setPayouts(pJson.payouts ?? [])
      setTickets(sJson.support_tickets ?? [])
      setAudits(aJson.audit_logs ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  const updateVendorStatus = async (
    id: string,
    status: VendorRow["status"]
  ) => {
    setBusyId(id)
    setError(null)
    try {
      const res = await fetch(`/admin/vendors/${encodeURIComponent(id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        throw new Error("Failed to update vendor status.")
      }
      await loadAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.")
    } finally {
      setBusyId(null)
    }
  }

  const updatePayout = async (id: string, status: PayoutRow["status"]) => {
    setBusyId(id)
    setError(null)
    try {
      const res = await fetch(`/admin/payouts/${encodeURIComponent(id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          reference: payoutRef[id]?.trim() || undefined,
        }),
      })
      if (!res.ok) {
        throw new Error("Failed to update payout.")
      }
      await loadAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.")
    } finally {
      setBusyId(null)
    }
  }

  const updateTicket = async (id: string, status: SupportRow["status"]) => {
    setBusyId(id)
    setError(null)
    try {
      const res = await fetch(
        `/admin/support-tickets/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            admin_note: ticketNote[id]?.trim() || undefined,
          }),
        }
      )
      if (!res.ok) {
        throw new Error("Failed to update support ticket.")
      }
      await loadAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <Heading level="h1">Marketplace Operations</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Manage vendors, payout requests, support tickets, and admin audit
            logs.
          </Text>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["vendors", `Vendors (${vendors.length})`],
              ["payouts", `Payouts (${payouts.length})`],
              ["support", `Support (${tickets.length})`],
              ["audit", `Audit Log (${audits.length})`],
            ] as const
          ).map(([key, label]) => (
            <Button
              key={key}
              size="small"
              variant={tab === key ? "primary" : "secondary"}
              onClick={() => setTab(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {error && (
        <div className="px-6 py-3">
          <Text size="small" className="text-ui-fg-error">
            {error}
          </Text>
        </div>
      )}

      <div className="px-6 py-4">
        {loading ? (
          <Text size="small" className="text-ui-fg-subtle">
            Loading...
          </Text>
        ) : tab === "vendors" ? (
          vendors.length === 0 ? (
            <Text size="small" className="text-ui-fg-subtle">
              No vendors registered yet.
            </Text>
          ) : (
            <div className="divide-y rounded-md border border-ui-border-base">
              {vendors.map((v) => (
                <div
                  key={v.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-3"
                >
                  <div>
                    <Text size="small" weight="plus">
                      {v.name} ({v.handle})
                    </Text>
                    <Text size="xsmall" className="text-ui-fg-subtle">
                      {v.contact_email} · ID: {v.id}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color={v.status === "verified" ? "green" : "blue"}>
                      {v.status}
                    </Badge>
                    <select
                      aria-label={`Status for ${v.name}`}
                      value={v.status}
                      disabled={busyId === v.id}
                      onChange={(e) =>
                        void updateVendorStatus(
                          v.id,
                          e.target.value as VendorRow["status"]
                        )
                      }
                      className="h-8 rounded-md border border-ui-border-base bg-ui-bg-field px-2 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : tab === "payouts" ? (
          payouts.length === 0 ? (
            <Text size="small" className="text-ui-fg-subtle">
              No payout requests yet.
            </Text>
          ) : (
            <div className="divide-y rounded-md border border-ui-border-base">
              {payouts.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-3"
                >
                  <div>
                    <Text size="small" weight="plus">
                      {p.amount} {p.currency_code.toUpperCase()}
                    </Text>
                    <Text size="xsmall" className="text-ui-fg-subtle">
                      Vendor: {p.vendor_id} · Ref: {p.reference || "None"}
                    </Text>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      size="small"
                      placeholder="Payout reference"
                      value={payoutRef[p.id] ?? p.reference ?? ""}
                      onChange={(e) =>
                        setPayoutRef((prev) => ({
                          ...prev,
                          [p.id]: e.target.value,
                        }))
                      }
                    />
                    <Badge color={p.status === "paid" ? "green" : "blue"}>
                      {p.status}
                    </Badge>
                    <select
                      aria-label={`Status for payout ${p.id}`}
                      value={p.status}
                      disabled={busyId === p.id}
                      onChange={(e) =>
                        void updatePayout(
                          p.id,
                          e.target.value as PayoutRow["status"]
                        )
                      }
                      className="h-8 rounded-md border border-ui-border-base bg-ui-bg-field px-2 text-xs"
                    >
                      <option value="requested">Requested</option>
                      <option value="approved">Approved</option>
                      <option value="paid">Paid</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : tab === "support" ? (
          tickets.length === 0 ? (
            <Text size="small" className="text-ui-fg-subtle">
              No support tickets yet.
            </Text>
          ) : (
            <div className="divide-y rounded-md border border-ui-border-base">
              {tickets.map((t) => (
                <div key={t.id} className="space-y-2 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <Text size="small" weight="plus">
                        [{t.category}] {t.subject}
                      </Text>
                      <Text size="xsmall" className="text-ui-fg-subtle">
                        {t.email}
                        {t.order_id ? ` · Order: ${t.order_id}` : ""}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        color={t.status === "resolved" ? "green" : "blue"}
                      >
                        {t.status}
                      </Badge>
                      <select
                        aria-label={`Status for ticket ${t.id}`}
                        value={t.status}
                        disabled={busyId === t.id}
                        onChange={(e) =>
                          void updateTicket(
                            t.id,
                            e.target.value as SupportRow["status"]
                          )
                        }
                        className="h-8 rounded-md border border-ui-border-base bg-ui-bg-field px-2 text-xs"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <Text size="xsmall" className="text-ui-fg-base">
                    {t.message}
                  </Text>
                  <Input
                    size="small"
                    placeholder="Internal admin note"
                    value={ticketNote[t.id] ?? t.admin_note ?? ""}
                    onChange={(e) =>
                      setTicketNote((prev) => ({
                        ...prev,
                        [t.id]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          )
        ) : audits.length === 0 ? (
          <Text size="small" className="text-ui-fg-subtle">
            No audit entries recorded yet.
          </Text>
        ) : (
          <div className="divide-y rounded-md border border-ui-border-base">
            {audits.map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 p-3"
              >
                <Text size="small" weight="plus">
                  {a.action} · {a.resource_type}:{a.resource_id}
                </Text>
                <Text size="xsmall" className="text-ui-fg-subtle">
                  Actor: {a.actor_id || "system"} ·{" "}
                  {new Date(a.created_at).toLocaleString()}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Marketplace",
})

export default MarketplaceAdminPage
