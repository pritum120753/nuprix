import { entitlementBlockReason } from "../entitlement-status"

const base = { download_count: 0, max_downloads: 3 }

describe("entitlementBlockReason", () => {
  it("is null for a usable entitlement", () => {
    expect(entitlementBlockReason(base)).toBeNull()
  })

  it("flags revoked first", () => {
    expect(
      entitlementBlockReason({
        ...base,
        revoked_at: new Date(),
        expires_at: new Date(0),
        download_count: 9,
      })
    ).toBe("revoked")
  })

  it("flags expired and limit_reached", () => {
    const now = new Date("2026-01-02")
    expect(
      entitlementBlockReason({ ...base, expires_at: new Date("2026-01-01") }, now)
    ).toBe("expired")
    expect(
      entitlementBlockReason({ ...base, expires_at: new Date("2026-01-03") }, now)
    ).toBeNull()
    expect(entitlementBlockReason({ ...base, download_count: 3 })).toBe(
      "limit_reached"
    )
  })
})
