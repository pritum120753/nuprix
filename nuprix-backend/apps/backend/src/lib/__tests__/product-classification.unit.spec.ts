import {
  buildProductClassificationPayload,
  normalizeProductFulfillmentType,
  resolveProductFulfillmentType,
} from "../product-classification"

describe("product-classification", () => {
  describe("normalizeProductFulfillmentType", () => {
    it("normalizes valid types case-insensitively", () => {
      expect(normalizeProductFulfillmentType("Digital")).toBe("digital")
      expect(normalizeProductFulfillmentType(" PHYSICAL ")).toBe("physical")
      expect(normalizeProductFulfillmentType("mixed")).toBe("mixed")
    })

    it("returns undefined for unknown or non-string values", () => {
      expect(normalizeProductFulfillmentType("virtual")).toBeUndefined()
      expect(normalizeProductFulfillmentType(null)).toBeUndefined()
      expect(normalizeProductFulfillmentType(123)).toBeUndefined()
    })
  })

  describe("resolveProductFulfillmentType", () => {
    it("defaults to physical when no digital files and no explicit type", () => {
      expect(
        resolveProductFulfillmentType({ hasDigitalFiles: false })
      ).toBe("physical")
    })

    it("returns digital when digital files exist and no explicit type", () => {
      expect(
        resolveProductFulfillmentType({ hasDigitalFiles: true })
      ).toBe("digital")
    })

    it("promotes physical+digitalFiles to mixed so digital delivery is never hidden", () => {
      expect(
        resolveProductFulfillmentType({
          explicitType: "physical",
          hasDigitalFiles: true,
        })
      ).toBe("mixed")
    })

    it("preserves mixed regardless of file count", () => {
      expect(
        resolveProductFulfillmentType({
          explicitType: "mixed",
          hasDigitalFiles: false,
        })
      ).toBe("mixed")
      expect(
        resolveProductFulfillmentType({
          explicitType: "mixed",
          hasDigitalFiles: true,
        })
      ).toBe("mixed")
    })

    it("respects explicit digital even before files are uploaded", () => {
      expect(
        resolveProductFulfillmentType({
          explicitType: "digital",
          hasDigitalFiles: false,
        })
      ).toBe("digital")
    })
  })

  describe("buildProductClassificationPayload", () => {
    it("omits internal storage keys from public digital file summaries", () => {
      const payload = buildProductClassificationPayload({
        productId: "prod_123",
        explicitType: undefined,
        digitalFiles: [
          {
            id: "dfile_1",
            title: "Starter Kit",
            file_name: "starter-kit.zip",
            mime_type: "application/zip",
            size_bytes: 2048,
            license_note: "Commercial single-seat",
            max_downloads: 5,
            expires_after_days: 30,
            file_key: "private/secret-key.zip",
          } as unknown as Parameters<
            typeof buildProductClassificationPayload
          >[0]["digitalFiles"][number],
        ],
      })

      expect(payload.product_type).toBe("digital")
      expect(payload.has_digital_files).toBe(true)
      expect(payload.digital_files).toHaveLength(1)
      expect(payload.digital_files[0]).toEqual({
        id: "dfile_1",
        title: "Starter Kit",
        file_name: "starter-kit.zip",
        mime_type: "application/zip",
        size_bytes: 2048,
        license_note: "Commercial single-seat",
        max_downloads: 5,
        expires_after_days: 30,
      })
      expect(
        "file_key" in (payload.digital_files[0] as unknown as Record<string, unknown>)
      ).toBe(false)
    })
  })
})
