import VendorModuleService from "../service"
import { UpdateVendorFulfillmentSchema } from "../../../api/store/vendors/validators"

describe("Vendor fulfillment groups", () => {
  it("groups multiple line items by vendor and is replay-safe", async () => {
    const service = Object.create(
      VendorModuleService.prototype
    ) as VendorModuleService

    const createdGroups: Array<Record<string, unknown>> = []
    const createdItems: Array<Record<string, unknown>> = []

    ;(service as unknown as Record<string, unknown>).listVendorProducts = jest.fn(
      async () => [
        { product_id: "prod_a", vendor_id: "vend_a" },
        { product_id: "prod_b", vendor_id: "vend_a" },
        { product_id: "prod_c", vendor_id: "vend_b" },
      ]
    )
    ;(service as unknown as Record<string, unknown>).listVendorFulfillmentGroups = jest.fn(
      async () => []
    )
    ;(service as unknown as Record<string, unknown>).listVendorFulfillmentItems = jest.fn(
      async () => []
    )
    ;(service as unknown as Record<string, unknown>).createVendorFulfillmentGroups = jest.fn(
      async (input: Record<string, unknown>) => {
        const group = { id: `group_${createdGroups.length + 1}`, ...input }
        createdGroups.push(group)
        return group
      }
    )
    ;(service as unknown as Record<string, unknown>).createVendorFulfillmentItems = jest.fn(
      async (input: Record<string, unknown>) => {
        createdItems.push(input)
        return { id: `item_${createdItems.length}`, ...input }
      }
    )

    const result = await service.createFulfillmentGroups({
      orderId: "order_1",
      items: [
        { id: "line_a", product_id: "prod_a", quantity: 2 },
        { id: "line_b", product_id: "prod_b", quantity: 1 },
        { id: "line_c", product_id: "prod_c", quantity: 1 },
      ],
    })

    expect(result).toEqual({ created_groups: 2, created_items: 3 })
    expect(createdGroups).toHaveLength(2)
    expect(createdItems).toHaveLength(3)
  })

  it("allows only HTTPS tracking URLs", () => {
    expect(
      UpdateVendorFulfillmentSchema.parse({
        status: "shipped",
        tracking_url: "https://carrier.example/track/123",
      }).tracking_url
    ).toBe("https://carrier.example/track/123")

    expect(() =>
      UpdateVendorFulfillmentSchema.parse({
        status: "shipped",
        tracking_url: "javascript:alert(1)",
      })
    ).toThrow(/HTTPS|valid HTTPS/i)

    expect(() =>
      UpdateVendorFulfillmentSchema.parse({
        status: "shipped",
        tracking_url: "http://carrier.example/track/123",
      })
    ).toThrow(/HTTPS/i)
  })
})
