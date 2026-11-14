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
    beforeAll(async () => {
      const apiKeys = getContainer().resolve(Modules.API_KEY)
      const publishableKey = await apiKeys.createApiKeys({
        title: "Digital downloads integration tests",
        type: "publishable",
        created_by: "integration-test",
      })
      api.defaults.headers.common["x-publishable-api-key"] =
        publishableKey.token
    })

    const get = (
      path: string,
      config: { headers?: Record<string, string> } = {}
    ) =>
      api.get(path, {
        ...config,
        maxRedirects: 0,
        validateStatus: () => true,
      })
    const post = (
      path: string,
      data: unknown = {},
      config: { headers?: Record<string, string> } = {}
    ) =>
      api.post(path, data, { ...config, validateStatus: () => true })

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
      return collection
    }

    async function seed(
      max_downloads = 2,
      customer_id?: string,
      email = "buyer@example.com"
    ) {
      const container = getContainer()
      const orders = container.resolve(Modules.ORDER)
      const service: DigitalDeliveryModuleService = container.resolve(
        DIGITAL_DELIVERY_MODULE
      )

      const order = await orders.createOrders({
        currency_code: "usd",
        email,
        customer_id,
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
        customer_id,
        email,
        digital_file_id: file.id,
        max_downloads,
      })
      return { service, order, file, token, entitlementId: id }
    }

    async function createCustomer(email: string) {
      const password = "Safe-test-password-2026!"
      const registration = await post("/auth/customer/emailpass/register", {
        email,
        password,
      })
      expect(registration.status).toBe(200)

      const createResponse = await post(
        "/store/customers",
        { email, first_name: "Local", last_name: "Test" },
        { headers: { authorization: `Bearer ${registration.data.token}` } }
      )
      expect(createResponse.status).toBe(200)

      const login = await post("/auth/customer/emailpass", { email, password })
      expect(login.status).toBe(200)
      return {
        id: createResponse.data.customer.id,
        token: login.data.token,
        email,
        password,
      }
    }

    afterEach(() => {
      jest.restoreAllMocks()
      delete process.env.DIGITAL_ALLOW_UNCAPTURED
    })

    it("returns 404 for an unknown token", async () => {
      const res = await get("/downloads/not-a-real-token")
      expect(res.status).toBe(404)
    })

    it("requires a customer session for download summaries and regeneration", async () => {
      const summary = await get("/store/customer/downloads")
      expect(summary.status).toBe(401)

      const regenerate = await post(
        "/store/customer/downloads/dent_not_owned/regenerate"
      )
      expect(regenerate.status).toBe(401)
    })

    it("regenerates only the owner's paid download link and never returns the token", async () => {
      const owner = await createCustomer("owner-download-test@example.com")
      const otherCustomer = await createCustomer(
        "other-download-test@example.com"
      )
      const { order, token, entitlementId } = await seed(
        2,
        owner.id,
        "owner-download-test@example.com"
      )
      await attachPayment(order.id, {
        amount: 10,
        captured_amount: 10,
      })

      const notification = getContainer().resolve(Modules.NOTIFICATION)
      const sendEmail = jest
        .spyOn(notification, "createNotifications")
        .mockResolvedValue([] as never)

      const wrongOwner = await post(
        `/store/customer/downloads/${entitlementId}/regenerate`,
        {},
        { headers: { authorization: `Bearer ${otherCustomer.token}` } }
      )
      expect(wrongOwner.status).toBe(404)
      expect(sendEmail).not.toHaveBeenCalled()

      const result = await post(
        `/store/customer/downloads/${entitlementId}/regenerate`,
        {},
        { headers: { authorization: `Bearer ${owner.token}` } }
      )
      expect(result.status).toBe(202)
      expect(JSON.stringify(result.data)).not.toContain(token)
      expect(JSON.stringify(result.data)).not.toContain("token_hash")
      expect(sendEmail).toHaveBeenCalledTimes(1)

      const notificationData = sendEmail.mock.calls[0]?.[0]?.data as {
        downloads: Array<{ url: string }>
      }
      const emailUrl = notificationData.downloads[0]?.url ?? ""
      const nextToken = emailUrl.split("/downloads/")[1]
      expect(nextToken).toBeTruthy()
      expect(nextToken).not.toBe(token)
      expect((await get(`/downloads/${token}`)).status).toBe(404)

      const summary = await get("/store/customer/downloads", {
        headers: { authorization: `Bearer ${owner.token}` },
      })
      expect(summary.status).toBe(200)
      expect(summary.data.downloads[0].status).toBe("available")
      expect(JSON.stringify(summary.data)).not.toContain(nextToken)
      expect(JSON.stringify(summary.data)).not.toContain("token_hash")
    })

    it("accepts a customer session cookie for download regeneration", async () => {
      const owner = await createCustomer("session-download-test@example.com")
      const { order, entitlementId } = await seed(2, owner.id, owner.email)
      await attachPayment(order.id, { amount: 10, captured_amount: 10 })

      const session = await post(
        "/auth/session",
        {},
        { headers: { authorization: `Bearer ${owner.token}` } }
      )
      expect(session.status).toBe(200)
      const cookie = (session.headers["set-cookie"] as string[] | undefined)
        ?.map((value) => value.split(";")[0])
        .join("; ")
      expect(cookie).toBeTruthy()

      const notification = getContainer().resolve(Modules.NOTIFICATION)
      const sendEmail = jest
        .spyOn(notification, "createNotifications")
        .mockResolvedValue([] as never)
      const regenerated = await post(
        `/store/customer/downloads/${entitlementId}/regenerate`,
        {},
        { headers: { cookie: cookie as string } }
      )
      expect(regenerated.status).toBe(202)
      expect(sendEmail).toHaveBeenCalledTimes(1)
    })

    it("does not let an account claim an entitlement with a null customer id", async () => {
      const owner = await createCustomer("null-owner-download-test@example.com")
      const { order, entitlementId } = await seed(2, undefined, owner.email)
      await attachPayment(order.id, { amount: 10, captured_amount: 10 })

      const notification = getContainer().resolve(Modules.NOTIFICATION)
      const sendEmail = jest
        .spyOn(notification, "createNotifications")
        .mockResolvedValue([] as never)
      const result = await post(
        `/store/customer/downloads/${entitlementId}/regenerate`,
        {},
        { headers: { authorization: `Bearer ${owner.token}` } }
      )
      expect(result.status).toBe(404)
      expect(sendEmail).not.toHaveBeenCalled()
    })

    it("rate limits regeneration per authenticated customer", async () => {
      const owner = await createCustomer("rate-limit-download-test@example.com")
      const { order, entitlementId } = await seed(2, owner.id, owner.email)
      await attachPayment(order.id, { amount: 10, captured_amount: 10 })
      const notification = getContainer().resolve(Modules.NOTIFICATION)
      jest
        .spyOn(notification, "createNotifications")
        .mockResolvedValue([] as never)

      for (let attempt = 0; attempt < 5; attempt += 1) {
        const allowed = await post(
          `/store/customer/downloads/${entitlementId}/regenerate`,
          {},
          { headers: { authorization: `Bearer ${owner.token}` } }
        )
        expect(allowed.status).toBe(202)
      }

      const limited = await post(
        `/store/customer/downloads/${entitlementId}/regenerate`,
        {},
        { headers: { authorization: `Bearer ${owner.token}` } }
      )
      expect(limited.status).toBe(429)
      expect(limited.headers["retry-after"]).toBeTruthy()
    })

    it("shows awaiting payment and refunded statuses in the customer library", async () => {
      const customer = await createCustomer("status-download-test@example.com")
      const pending = await seed(2, customer.id, customer.email)
      const refunded = await seed(2, customer.id, customer.email)
      await attachPayment(refunded.order.id, {
        amount: 10,
        captured_amount: 10,
        refunded_amount: 10,
      })

      const summary = await get("/store/customer/downloads", {
        headers: { authorization: `Bearer ${customer.token}` },
      })
      expect(summary.status).toBe(200)
      expect(
        summary.data.downloads.find(
          (download: { id: string }) => download.id === pending.entitlementId
        ).status
      ).toBe("awaiting_payment")
      expect(
        summary.data.downloads.find(
          (download: { id: string }) => download.id === refunded.entitlementId
        ).status
      ).toBe("refunded")
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
      expect((await get(`/downloads/${refunded.token}`)).status).toBe(410)
    })

    it("does not serve a canceled order even when uncaptured downloads are enabled", async () => {
      process.env.DIGITAL_ALLOW_UNCAPTURED = "true"
      const { token, order } = await seed()
      const orders = getContainer().resolve(Modules.ORDER)
      await orders.cancel(order.id)
      expect((await get(`/downloads/${token}`)).status).toBe(410)
    })

    it("returns 503 when the distributed download lock times out", async () => {
      process.env.DIGITAL_ALLOW_UNCAPTURED = "true"
      const { token } = await seed()
      const locking = getContainer().resolve(Modules.LOCKING)
      const execute = jest
        .spyOn(locking, "execute")
        .mockRejectedValueOnce(new Error("lock timeout"))
      expect((await get(`/downloads/${token}`)).status).toBe(503)
      execute.mockRestore()
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
