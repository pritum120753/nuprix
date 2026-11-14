import {
  allowsUncapturedDownloads,
  resolveDownloadStatus,
} from "../customer-download-status"

const entitlement = {
  revoked_at: null,
  expires_at: null,
  download_count: 0,
  max_downloads: 5,
}

const paidOrder = {
  status: "completed",
  total: 25,
  payment_collections: [
    {
      status: "completed",
      amount: 25,
      captured_amount: 25,
      refunded_amount: 0,
    },
  ],
}

describe("resolveDownloadStatus", () => {
  it("distinguishes missing, unpaid, refunded and canceled order states", () => {
    expect(resolveDownloadStatus(entitlement, null)).toBe("unavailable")
    expect(
      resolveDownloadStatus(entitlement, {
        ...paidOrder,
        total: 25,
        payment_collections: [
          { amount: 25, captured_amount: 12, refunded_amount: 0 },
        ],
      })
    ).toBe("awaiting_payment")
    expect(
      resolveDownloadStatus(entitlement, {
        ...paidOrder,
        payment_collections: [
          { amount: 25, captured_amount: 25, refunded_amount: 1 },
        ],
      })
    ).toBe("refunded")
    expect(
      resolveDownloadStatus(entitlement, {
        ...paidOrder,
        status: "canceled",
      })
    ).toBe("order_canceled")
  })

  it("shows available for fully paid orders", () => {
    expect(resolveDownloadStatus(entitlement, paidOrder)).toBe("available")
  })

  it("treats a zero-total order as paid without a payment collection", () => {
    expect(
      resolveDownloadStatus(entitlement, {
        status: "completed",
        total: 0,
        payment_collections: [],
      })
    ).toBe("available")
  })

  it("uses captured funds against the order total, ignoring extra uncaptured collections", () => {
    expect(
      resolveDownloadStatus(entitlement, {
        status: "completed",
        total: 25,
        payment_collections: [
          { amount: 25, captured_amount: 25, refunded_amount: 0 },
          { amount: 25, captured_amount: 0, refunded_amount: 0 },
        ],
      })
    ).toBe("available")
  })

  it("reports refunds before expiry or exhausted download limits", () => {
    expect(
      resolveDownloadStatus(
        {
          ...entitlement,
          expires_at: "2026-11-13T00:00:00.000Z",
          download_count: 5,
        },
        {
          ...paidOrder,
          payment_collections: [
            { amount: 25, captured_amount: 25, refunded_amount: 1 },
          ],
        },
        new Date("2026-11-14T00:00:00.000Z")
      )
    ).toBe("refunded")
  })

  it("treats a missing order as unavailable and applies entitlement precedence", () => {
    expect(
      resolveDownloadStatus(
        { ...entitlement, expires_at: "2026-11-13T00:00:00.000Z" },
        null
      )
    ).toBe("unavailable")
    expect(
      resolveDownloadStatus(
        { ...entitlement, revoked_at: new Date() },
        { ...paidOrder, status: "canceled" }
      )
    ).toBe("revoked")
    expect(
      resolveDownloadStatus(
        { ...entitlement, expires_at: "2026-11-13T00:00:00.000Z" },
        paidOrder,
        new Date("2026-11-14T00:00:00.000Z")
      )
    ).toBe("expired")
    expect(
      resolveDownloadStatus(
        { ...entitlement, download_count: 5 },
        paidOrder
      )
    ).toBe("limit_reached")
  })

  it("only allows the uncaptured-payment bypass in development and test", () => {
    expect(
      allowsUncapturedDownloads({
        NODE_ENV: "development",
        DIGITAL_ALLOW_UNCAPTURED: "true",
      } as NodeJS.ProcessEnv)
    ).toBe(true)
    expect(
      allowsUncapturedDownloads({
        NODE_ENV: "production",
        DIGITAL_ALLOW_UNCAPTURED: "true",
      } as NodeJS.ProcessEnv)
    ).toBe(false)
    expect(
      allowsUncapturedDownloads({
        NODE_ENV: "preview",
        DIGITAL_ALLOW_UNCAPTURED: "true",
      } as NodeJS.ProcessEnv)
    ).toBe(false)
  })
})
