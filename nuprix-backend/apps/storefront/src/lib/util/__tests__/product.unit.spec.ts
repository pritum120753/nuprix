import {
  getCartDeliverySplit,
  getLineItemFulfillmentType,
  type ProductClassification,
} from "../product"

const classification = (
  productType: "digital" | "physical" | "mixed"
): ProductClassification => ({
  product_id: "prod_test",
  product_type: productType,
  has_digital_files: productType !== "physical",
  digital_files: [],
})

describe("cart line-item fulfillment classification", () => {
  it("treats classified digital items as digital", () => {
    const item = { classification: classification("digital") }
    expect(getLineItemFulfillmentType(item)).toBe("digital")
  })

  it("treats classified physical items as physical", () => {
    const item = { classification: classification("physical") }
    expect(getLineItemFulfillmentType(item)).toBe("physical")
  })

  it("treats classified mixed items as mixed", () => {
    const item = { classification: classification("mixed") }
    expect(getLineItemFulfillmentType(item)).toBe("mixed")
  })

  it("keeps unknown classification out of digital-only shipping decisions", () => {
    expect(getCartDeliverySplit([{}])).toEqual({
      hasDigital: false,
      hasPhysical: true,
      isMixed: false,
      isDigitalOnly: false,
      hasUnknown: true,
    })
  })

  it("recognizes a classified digital-only cart", () => {
    expect(
      getCartDeliverySplit([
        { classification: classification("digital") },
      ]).isDigitalOnly
    ).toBe(true)
  })
})
