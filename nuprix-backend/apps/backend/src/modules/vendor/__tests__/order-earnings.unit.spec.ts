import VendorModuleService from "../service"

describe("VendorModuleService.recordOrderEarnings", () => {
  it("records vendor earnings idempotently and skips house products", async () => {
    const service = Object.create(
      VendorModuleService.prototype
    ) as VendorModuleService

    const createVendorEarnings = jest.fn(async (rows) => rows)

    Object.assign(service, {
      listVendorProducts: jest.fn(async () => [
        { id: "vprd_1", vendor_id: "vnd_1", product_id: "prod_vendor" },
      ]),
      listVendors: jest.fn(async () => [
        { id: "vnd_1", commission_rate_bps: 1000 },
      ]),
      listVendorEarnings: jest.fn(async () => [{ line_item_id: "item_seen" }]),
      createVendorEarnings,
    })

    const result = await service.recordOrderEarnings({
      orderId: "order_1",
      currencyCode: "BDT",
      initialStatus: "available",
      items: [
        { id: "item_seen", product_id: "prod_vendor", total: 1000 },
        { id: "item_house", product_id: "prod_house", total: 500 },
        {
          id: "item_new",
          product_id: "prod_vendor",
          total: { numeric: 2000 },
        },
      ],
    })

    expect(result).toEqual({ created_count: 1 })
    expect(createVendorEarnings).toHaveBeenCalledWith([
      {
        vendor_id: "vnd_1",
        order_id: "order_1",
        line_item_id: "item_new",
        currency_code: "bdt",
        gross_amount: 2000,
        commission_rate_bps: 1000,
        platform_fee: 200,
        vendor_net: 1800,
        status: "available",
      },
    ])
  })
})
