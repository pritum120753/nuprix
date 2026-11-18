import VendorModuleService, { normalizeVendorHandle } from "../service"

describe("VendorModuleService isolation & helpers", () => {
  it("normalizes vendor handles into URL-safe slugs", () => {
    expect(normalizeVendorHandle("  Nuprix Studio! ")).toBe("nuprix-studio")
    expect(normalizeVendorHandle("A & B_Store--2026")).toBe("a-b-store-2026")
  })

  it("isolates products between two vendors (F-AUTH-03)", async () => {
    const mappings = [
      { id: "vprd_1", vendor_id: "vnd_1", product_id: "prod_alpha" },
      { id: "vprd_2", vendor_id: "vnd_2", product_id: "prod_beta" },
    ]

    const service = Object.create(
      VendorModuleService.prototype
    ) as VendorModuleService

    Object.assign(service, {
      listVendorProducts: jest.fn(
        async (filters: { vendor_id?: string; product_id?: string }) => {
          return mappings.filter(
            (m) =>
              (!filters.vendor_id || m.vendor_id === filters.vendor_id) &&
              (!filters.product_id || m.product_id === filters.product_id)
          )
        }
      ),
    })

    await expect(
      service.assertProductOwnedByVendor("vnd_1", "prod_alpha")
    ).resolves.toMatchObject({ product_id: "prod_alpha" })

    await expect(
      service.assertProductOwnedByVendor("vnd_1", "prod_beta")
    ).rejects.toThrow("Product not found for this vendor.")

    await expect(service.listVendorProductIds("vnd_2")).resolves.toEqual([
      "prod_beta",
    ])
  })
})
