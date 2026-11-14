import { getCustomerDownloadStatus } from "../customer-download-status"

const entitlement = {
  revoked_at: null,
  expires_at: null,
  download_count: 0,
  max_downloads: 5,
}

const paidOrder = {
  status: "completed",
  payment_collections: [
    {
      status: "completed",
      amount: 25,
      captured_amount: 25,
      refunded_amount: 0,
    },
  ],
}

describe("getCustomerDownloadStatus", () => {
  it("shows pending until payment is fully captured and not refunded", () => {
    expect(getCustomerDownloadStatus(entitlement, null)).toBe("pending")
    expect(
      getCustomerDownloadStatus(entitlement, {
        ...paidOrder,
        payment_collections: [
          { amount: 25, captured_amount: 12, refunded_amount: 0 },
        ],
      })
    ).toBe("pending")
    expect(
      getCustomerDownloadStatus(entitlement, {
        ...paidOrder,
        payment_collections: [
          { amount: 25, captured_amount: 25, refunded_amount: 25 },
        ],
      })
    ).toBe("pending")
    expect(
      getCustomerDownloadStatus(entitlement, {
        ...paidOrder,
        status: "canceled",
      })
    ).toBe("pending")
  })

  it("shows available for fully paid orders", () => {
    expect(getCustomerDownloadStatus(entitlement, paidOrder)).toBe("available")
  })

  it("prioritizes revoked, expired, and exhausted entitlements", () => {
    const now = new Date("2026-11-14T00:00:00.000Z")
    expect(
      getCustomerDownloadStatus(
        { ...entitlement, revoked_at: now },
        null,
        now
      )
    ).toBe("revoked")
    expect(
      getCustomerDownloadStatus(
        { ...entitlement, expires_at: "2026-11-13T00:00:00.000Z" },
        null,
        now
      )
    ).toBe("expired")
    expect(
      getCustomerDownloadStatus(
        { ...entitlement, download_count: 5 },
        null,
        now
      )
    ).toBe("limit_reached")
  })
})
