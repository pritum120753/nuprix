import { createApprovedPayoutCsv } from "../csv"

describe("createApprovedPayoutCsv", () => {
  it("exports approved payouts only and escapes spreadsheet formulas", () => {
    const csv = createApprovedPayoutCsv([
      {
        id: "approved",
        vendor_id: "vendor-1",
        amount: 12500,
        currency_code: "bdt",
        status: "approved",
        payout_method: "bkash",
        bank_name: null,
        account_name: null,
        account_number: null,
        mobile_number: "=SUM(1,1)",
        created_at: "2026-11-23T00:00:00.000Z",
      },
      {
        id: "requested",
        vendor_id: "vendor-2",
        amount: 7000,
        currency_code: "bdt",
        status: "requested",
        payout_method: "bank_transfer",
        bank_name: "Example Bank",
        account_name: "Vendor",
        account_number: "123",
        mobile_number: null,
        created_at: "2026-11-23T00:00:00.000Z",
      },
    ])

    expect(csv).toContain('"approved"')
    expect(csv).not.toContain('"requested"')
    expect(csv).toContain(`"'=SUM(1,1)"`)
  })

  it("quotes and escapes CSV delimiter characters", () => {
    const csv = createApprovedPayoutCsv([
      {
        id: "payout-1",
        vendor_id: "vendor-1",
        amount: 1,
        currency_code: "bdt",
        status: "approved",
        payout_method: "bank_transfer",
        bank_name: "Bank, Inc.",
        account_name: 'Example "Vendor"',
        account_number: "123",
        mobile_number: null,
        created_at: new Date("2026-11-23T00:00:00.000Z"),
      },
    ])

    expect(csv).toContain('"Bank, Inc."')
    expect(csv).toContain('"Example ""Vendor"""')
    expect(csv).toContain('"2026-11-23T00:00:00.000Z"')
  })
})
