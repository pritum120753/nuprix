export const DEFAULT_COMMISSION_BPS = 1500

export interface CommissionSplit {
  gross_amount: number
  commission_rate_bps: number
  platform_fee: number
  vendor_net: number
}

export function calculateCommissionSplit(input: {
  grossAmount: number
  commissionRateBps?: number | null
}): CommissionSplit {
  const gross_amount = Math.max(0, Math.round(input.grossAmount))
  const rawRate = input.commissionRateBps ?? DEFAULT_COMMISSION_BPS
  const commission_rate_bps = Math.min(10000, Math.max(0, Math.round(rawRate)))
  const platform_fee = Math.round((gross_amount * commission_rate_bps) / 10000)
  const vendor_net = gross_amount - platform_fee

  return {
    gross_amount,
    commission_rate_bps,
    platform_fee,
    vendor_net,
  }
}

export type EarningLike = {
  vendor_net: number
  status: "pending" | "available" | "reversed"
  currency_code: string
}

export type PayoutLike = {
  amount: number
  status: "requested" | "approved" | "paid" | "rejected"
  currency_code: string
}

export interface VendorBalanceSummary {
  currency_code: string
  lifetime_net: number
  pending_net: number
  available_balance: number
  reserved_payouts: number
  paid_total: number
}

export function computeVendorBalance(
  earnings: EarningLike[],
  payouts: PayoutLike[],
  currencyCode: string
): VendorBalanceSummary {
  const code = currencyCode.toLowerCase()
  let lifetime_net = 0
  let pending_net = 0
  let available_earnings = 0

  for (const e of earnings) {
    if (e.currency_code.toLowerCase() !== code || e.status === "reversed") {
      continue
    }
    lifetime_net += e.vendor_net
    if (e.status === "pending") {
      pending_net += e.vendor_net
    } else if (e.status === "available") {
      available_earnings += e.vendor_net
    }
  }

  let reserved_payouts = 0
  let paid_total = 0

  for (const p of payouts) {
    if (p.currency_code.toLowerCase() !== code || p.status === "rejected") {
      continue
    }
    if (p.status === "paid") {
      paid_total += p.amount
    } else {
      reserved_payouts += p.amount
    }
  }

  return {
    currency_code: code,
    lifetime_net,
    pending_net,
    available_balance: Math.max(
      0,
      available_earnings - reserved_payouts - paid_total
    ),
    reserved_payouts,
    paid_total,
  }
}
