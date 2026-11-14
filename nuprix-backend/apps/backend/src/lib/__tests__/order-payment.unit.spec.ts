import { isFullyPaid } from "../order-payment"

describe("isFullyPaid", () => {
  it("is false with no payment collections", () => {
    expect(isFullyPaid([])).toBe(false)
    expect(isFullyPaid(undefined)).toBe(false)
  })

  it("is true only when every active collection is fully captured", () => {
    expect(isFullyPaid([{ amount: 10, captured_amount: 10 }])).toBe(true)
    expect(isFullyPaid([{ amount: 10, captured_amount: 4 }])).toBe(false)
    expect(isFullyPaid([{ amount: 10, captured_amount: 0 }])).toBe(false)
  })

  it("ignores canceled collections", () => {
    expect(
      isFullyPaid([
        { status: "canceled", amount: 10, captured_amount: 0 },
        { amount: 10, captured_amount: 10 },
      ])
    ).toBe(true)
    expect(isFullyPaid([{ status: "canceled", amount: 10 }])).toBe(false)
  })

  it("is false once anything has been refunded", () => {
    expect(
      isFullyPaid([{ amount: 10, captured_amount: 10, refunded_amount: 1 }])
    ).toBe(false)
  })

  it("reads BigNumber-style values", () => {
    expect(
      isFullyPaid([{ amount: { numeric: 10 }, captured_amount: { numeric: 10 } }])
    ).toBe(true)
  })
})

import { getPaymentState } from "../order-payment"

describe("getPaymentState", () => {
  it("unpaid for none, uncaptured and partially captured", () => {
    expect(getPaymentState([])).toBe("unpaid")
    expect(getPaymentState([{ amount: 10, captured_amount: 0 }])).toBe("unpaid")
    expect(getPaymentState([{ amount: 10, captured_amount: 9 }])).toBe("unpaid")
  })

  it("paid when every active collection is fully captured", () => {
    expect(getPaymentState([{ amount: 10, captured_amount: 10 }])).toBe("paid")
    expect(
      getPaymentState([
        { status: "canceled", amount: 5, captured_amount: 0 },
        { amount: 10, captured_amount: 10 },
      ])
    ).toBe("paid")
  })

  it("refunded as soon as anything was refunded", () => {
    expect(
      getPaymentState([{ amount: 10, captured_amount: 10, refunded_amount: 1 }])
    ).toBe("refunded")
  })
})
