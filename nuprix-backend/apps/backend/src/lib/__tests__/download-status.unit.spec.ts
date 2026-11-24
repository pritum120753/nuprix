import { resolveEntitlementStatus } from "../download-status"

describe("resolveEntitlementStatus", () => {
  const future = new Date(Date.now() + 60_000)
  const past = new Date(Date.now() - 60_000)

  it("returns available when active, paid, unexpired, and under limit", () => {
    expect(
      resolveEntitlementStatus({
        downloadCount: 0,
        maxDownloads: 5,
        expiresAt: future,
        isOrderPaid: true,
      })
    ).toBe("available")
  })

  it("prioritizes revoked and canceled over all other states", () => {
    expect(
      resolveEntitlementStatus({
        revokedAt: new Date(),
        expiresAt: past,
        downloadCount: 5,
        maxDownloads: 5,
        isOrderPaid: false,
      })
    ).toBe("revoked")

    expect(
      resolveEntitlementStatus({
        isOrderCanceled: true,
        isOrderPaid: false,
        downloadCount: 0,
        maxDownloads: 5,
      })
    ).toBe("revoked")
  })

  it("prioritizes awaiting_payment over expired and limit_reached", () => {
    expect(
      resolveEntitlementStatus({
        isOrderPaid: false,
        expiresAt: past,
        downloadCount: 5,
        maxDownloads: 5,
      })
    ).toBe("awaiting_payment")
  })

  it("prioritizes expired over limit_reached", () => {
    expect(
      resolveEntitlementStatus({
        isOrderPaid: true,
        expiresAt: past,
        downloadCount: 5,
        maxDownloads: 5,
      })
    ).toBe("expired")
  })

  it("returns limit_reached when downloadCount >= maxDownloads", () => {
    expect(
      resolveEntitlementStatus({
        isOrderPaid: true,
        expiresAt: future,
        downloadCount: 5,
        maxDownloads: 5,
      })
    ).toBe("limit_reached")
  })
})
