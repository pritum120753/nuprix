import { medusaIntegrationTestRunner } from "@medusajs/test-utils"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { DIGITAL_DELIVERY_MODULE } from "../../src/modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../src/modules/digital-delivery/service"
import { grantDigitalAccessWorkflow } from "../../src/workflows/grant-digital-access"

jest.setTimeout(120 * 1000)

medusaIntegrationTestRunner({
  env: {
    DIGITAL_S3_BUCKET: "nuprix-private-test",
    DIGITAL_S3_REGION: "ap-southeast-1",
    DIGITAL_S3_ENDPOINT: "http://localhost:9999/storage/v1/s3",
    DIGITAL_S3_ACCESS_KEY_ID: "test-key",
    DIGITAL_S3_SECRET_ACCESS_KEY: "test-secret",
  },
  testSuite: ({ api, getContainer }) => {
    const get = (path: string) =>
      api.get(path, { maxRedirects: 0, validateStatus: () => true })

    // Gives an order a real payment collection (the only source of truth
    // Medusa has for whether an order is paid).
    async function attachPayment(
      order_id: string,
      values: { amount: number; captured_amount?: number; refunded_amount?: number }
    ) {
      const container = getContainer()
      const payments = container.resolve(Modules.PAYMENT)
      const link = container.resolve(ContainerRegistrationKeys.LINK)

      const collection = await payments.createPaymentCollections({
        currency_code: "usd",
        amount: values.amount,
      })
      await payments.updatePaymentCollections(collection.id, {
        captured_amount: values.captured_amount ?? 0,
        refunded_amount: values.refunded_amount ?? 0,
      } as never)
      await link.create({
        [Modules.ORDER]: { order_id },
        [Modules.PAYMENT]: { payment_collection_id: collection.id },
      })
    }

    async function seed(max_downloads = 2) {
      const container = getContainer()
      const orders = container.resolve(Modules.ORDER)
      const service: DigitalDeliveryModuleService = container.resolve(
        DIGITAL_DELIVERY_MODULE
      )

      const order = await orders.createOrders({
        currency_code: "usd",
        email: "buyer@example.com",
        items: [
          { title: "Course", quantity: 1, unit_price: 10, product_id: "prod_x" },
        ],
      })
      const file = await service.createDigitalFiles({
        product_id: "prod_x",
        title: "Course PDF",
        file_key: "digital/abc/course.pdf",
        file_name: "course.pdf",
        max_downloads,
      })
      const { token, id } = await service.grant({
        order_id: order.id,
        email: "buyer@example.com",
        digital_file_id: file.id,
        max_downloads,
      })
      return { service, order, file, token, entitlementId: id }
    }

    afterEach(() => {
      delete process.env.DIGITAL_ALLOW_UNCAPTURED
    })

    it("returns 404 for an unknown token", async () => {
      const res = await get("/downloads/not-a-real-token")
      expect(res.status).toBe(404)
    })

    it("refuses to serve a file until payment is captured", async () => {
      const { token, service, entitlementId } = await seed()
      const res = await get(`/downloads/${token}`)
      expect(res.status).toBe(402)

      const entitlement = await service.retrieveDownloadEntitlement(entitlementId)
      expect(entitlement.download_count).toBe(0)
    })

    it("serves the file only for a fully captured, unrefunded payment", async () => {
      const unpaid = await seed()
      await attachPayment(unpaid.order.id, { amount: 10 })
      expect((await get(`/downloads/${unpaid.token}`)).status).toBe(402)

      const partial = await seed()
      await attachPayment(partial.order.id, { amount: 10, captured_amount: 4 })
      expect((await get(`/downloads/${partial.token}`)).status).toBe(402)

      const paid = await seed()
      await attachPayment(paid.order.id, { amount: 10, captured_amount: 10 })
      const ok = await get(`/downloads/${paid.token}`)
      expect(ok.status).toBe(302)
      expect(ok.headers.location).toContain("X-Amz-Signature")

      const refunded = await seed()
      await attachPayment(refunded.order.id, {
        amount: 10,
        captured_amount: 10,
        refunded_amount: 10,
      })
      expect((await get(`/downloads/${refunded.token}`)).status).toBe(402)
    })

    it("redirects to a short-lived signed URL and enforces the limit", async () => {
      process.env.DIGITAL_ALLOW_UNCAPTURED = "true"
      const { token, service, entitlementId } = await seed(2)

      const first = await get(`/downloads/${token}`)
      expect(first.status).toBe(302)
      expect(first.headers.location).toContain("digital/abc/course.pdf")
      expect(first.headers.location).toContain("X-Amz-Signature")
      expect(first.headers.location).toContain("X-Amz-Expires=60")
      expect(first.headers["cache-control"]).toBe("no-store")

      expect((await get(`/downloads/${token}`)).status).toBe(302)

      const third = await get(`/downloads/${token}`)
      expect(third.status).toBe(410)

      const entitlement = await service.retrieveDownloadEntitlement(entitlementId)
      expect(entitlement.download_count).toBe(2)
    })

    it("never lets parallel requests exceed the limit", async () => {
      process.env.DIGITAL_ALLOW_UNCAPTURED = "true"
      const { token, service, entitlementId } = await seed(2)

      const results = await Promise.all(
        Array.from({ length: 6 }, () => get(`/downloads/${token}`))
      )
      expect(results.filter((r) => r.status === 302)).toHaveLength(2)

      const entitlement = await service.retrieveDownloadEntitlement(entitlementId)
      expect(entitlement.download_count).toBe(2)
    })

    it("rejects revoked and expired entitlements", async () => {
      process.env.DIGITAL_ALLOW_UNCAPTURED = "true"
      const revoked = await seed()
      await revoked.service.updateDownloadEntitlements({
        id: revoked.entitlementId,
        revoked_at: new Date(),
      })
      expect((await get(`/downloads/${revoked.token}`)).status).toBe(410)

      const expired = await seed()
      await expired.service.updateDownloadEntitlements({
        id: expired.entitlementId,
        expires_at: new Date(Date.now() - 1000),
      })
      expect((await get(`/downloads/${expired.token}`)).status).toBe(410)
    })

    it("grants access once per order and file, even if run twice", async () => {
      const container = getContainer()
      const orders = container.resolve(Modules.ORDER)
      const service: DigitalDeliveryModuleService = container.resolve(
        DIGITAL_DELIVERY_MODULE
      )
      const order = await orders.createOrders({
        currency_code: "usd",
        email: "buyer2@example.com",
        items: [
          { title: "Kit", quantity: 1, unit_price: 5, product_id: "prod_y" },
        ],
      })
      await service.createDigitalFiles({
        product_id: "prod_y",
        title: "Kit",
        file_key: "digital/def/kit.zip",
        file_name: "kit.zip",
      })

      await grantDigitalAccessWorkflow(container).run({
        input: { order_id: order.id },
      })
      await grantDigitalAccessWorkflow(container).run({
        input: { order_id: order.id },
      })

      const granted = await service.listDownloadEntitlements({
        order_id: order.id,
      })
      expect(granted).toHaveLength(1)
      expect(granted[0].email).toBe("buyer2@example.com")
      expect(granted[0].token_hash).toHaveLength(64)
    })
  },
})
