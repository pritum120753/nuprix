import {
  calculateCommissionSplit,
  computeVendorBalance,
} from "../commission"

describe("vendor commission & payout ledger", () => {
  it("splits gross amount into platform_fee + vendor_net with exact integer sum", () => {
    const split = calculateCommissionSplit({
      grossAmount: 1999,
      commissionRateBps: 1500,
    })

    expect(split.platform_fee).toBe(300)
    expect(split.vendor_net).toBe(1699)
    expect(split.platform_fee + split.vendor_net).toBe(1999)
  })

  it("clamps commission rates to 0..10000 bps", () => {
    expect(
      calculateCommissionSplit({ grossAmount: 500, commissionRateBps: -100 })
    ).toMatchObject({ platform_fee: 0, vendor_net: 500 })

    expect(
      calculateCommissionSplit({ grossAmount: 500, commissionRateBps: 15000 })
    ).toMatchObject({ platform_fee: 500, vendor_net: 0 })
  })

  it("computes available balance excluding reversed earnings and rejected payouts", () => {
    const balance = computeVendorBalance(
      [
        { vendor_net: 1000, status: "available", currency_code: "bdt" },
        { vendor_net: 500, status: "pending", currency_code: "bdt" },
        { vendor_net: 300, status: "reversed", currency_code: "bdt" },
        { vendor_net: 900, status: "available", currency_code: "usd" },
      ],
      [
        { amount: 400, status: "paid", currency_code: "bdt" },
        { amount: 200, status: "requested", currency_code: "bdt" },
        { amount: 999, status: "rejected", currency_code: "bdt" },
      ],
      "BDT"
    )

    expect(balance).toEqual({
      currency_code: "bdt",
      lifetime_net: 1500,
      pending_net: 500,
      available_balance: 400,
      reserved_payouts: 200,
      paid_total: 400,
    })
  })
})
