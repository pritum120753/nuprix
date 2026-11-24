import { isDownloadOwnedByCustomer } from "../download-ownership"

describe("isDownloadOwnedByCustomer", () => {
  it("requires the signed-in customer to own both the entitlement and order", () => {
    expect(isDownloadOwnedByCustomer("cus_a", "cus_a", "cus_a")).toBe(true)
    expect(isDownloadOwnedByCustomer("cus_b", "cus_a", "cus_a")).toBe(false)
    expect(isDownloadOwnedByCustomer("cus_a", "cus_a", "cus_b")).toBe(false)
    expect(isDownloadOwnedByCustomer("cus_a", null, "cus_a")).toBe(false)
    expect(isDownloadOwnedByCustomer(undefined, "cus_a", "cus_a")).toBe(false)
  })
})
