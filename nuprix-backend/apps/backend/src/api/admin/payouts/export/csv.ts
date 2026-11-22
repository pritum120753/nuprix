export type PayoutExportRecord = {
  id: string
  vendor_id: string
  amount: number
  currency_code: string
  status: "requested" | "approved" | "paid" | "rejected"
  payout_method: "bank_transfer" | "bkash" | "nagad" | "rocket" | null
  bank_name: string | null
  account_name: string | null
  account_number: string | null
  mobile_number: string | null
  created_at: Date | string
}

const headers = [
  "payout_id",
  "vendor_id",
  "amount",
  "currency_code",
  "status",
  "payout_method",
  "bank_name",
  "account_name",
  "account_number",
  "mobile_number",
  "created_at",
]

function csvCell(value: Date | number | string | null): string {
  const rawValue = value instanceof Date ? value.toISOString() : String(value ?? "")
  const safeValue = /^[\t\r\n ]*[=+\-@]/.test(rawValue)
    ? `'${rawValue}`
    : rawValue

  return `"${safeValue.replace(/"/g, '""')}"`
}

export function createApprovedPayoutCsv(
  payouts: PayoutExportRecord[]
): string {
  const rows = payouts
    .filter((payout) => payout.status === "approved")
    .map((payout) =>
      [
        payout.id,
        payout.vendor_id,
        payout.amount,
        payout.currency_code,
        payout.status,
        payout.payout_method,
        payout.bank_name,
        payout.account_name,
        payout.account_number,
        payout.mobile_number,
        payout.created_at,
      ]
        .map(csvCell)
        .join(",")
    )

  return [headers.map(csvCell).join(","), ...rows].join("\r\n") + "\r\n"
}
