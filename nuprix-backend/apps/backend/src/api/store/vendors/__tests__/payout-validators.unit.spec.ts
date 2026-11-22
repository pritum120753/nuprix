import { RequestVendorPayoutSchema } from "../validators"

describe("RequestVendorPayoutSchema", () => {
  it.each(["bkash", "nagad", "rocket"] as const)(
    "accepts a valid %s Bangladesh mobile number",
    (payout_method) => {
      expect(
        RequestVendorPayoutSchema.safeParse({
          amount: 1000,
          currency_code: "bdt",
          payout_method,
          mobile_number: "01712345678",
        }).success
      ).toBe(true)
    }
  )

  it.each(["01212345678", "01112345678", "0171234567", "+8801712345678"])(
    "rejects an invalid Bangladesh mobile number: %s",
    (mobile_number) => {
      expect(
        RequestVendorPayoutSchema.safeParse({
          amount: 1000,
          currency_code: "bdt",
          payout_method: "bkash",
          mobile_number,
        }).success
      ).toBe(false)
    }
  )

  it("requires complete bank destination details", () => {
    expect(
      RequestVendorPayoutSchema.safeParse({
        amount: 1000,
        currency_code: "bdt",
        payout_method: "bank_transfer",
        bank_name: "Example Bank",
        account_name: "Vendor",
      }).success
    ).toBe(false)
  })

  it("rejects MFS requests not denominated in BDT", () => {
    expect(
      RequestVendorPayoutSchema.safeParse({
        amount: 1000,
        currency_code: "usd",
        payout_method: "rocket",
        mobile_number: "01712345678",
      }).success
    ).toBe(false)
  })
})
