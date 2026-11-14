import { medusaIntegrationTestRunner } from "@medusajs/test-utils"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { DIGITAL_DELIVERY_MODULE } from "../../src/modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../src/modules/digital-delivery/service"

jest.setTimeout(180 * 1000)

medusaIntegrationTestRunner({
  env: {
    DIGITAL_S3_BUCKET: "nuprix-private-test",
    DIGITAL_S3_REGION: "ap-southeast-1",
    DIGITAL_S3_ENDPOINT: "http://localhost:9999/storage/v1/s3",
    DIGITAL_S3_ACCESS_KEY_ID: "test-key",
    DIGITAL_S3_SECRET_ACCESS_KEY: "test-secret",
    DOWNLOAD_BASE_URL: "https://api.nuprix.test",
  },
  testSuite: ({ api, getContainer }) => {
    let pk: string
    let seq = 0

    beforeAll(async () => {
      delete process.env.DIGITAL_ALLOW_UNCAPTURED
      const key = await getContainer()
        .resolve(Modules.API_KEY)
        .createApiKeys({ title: "test", type: "publishable", created_by: "" })
      pk = key.token
    })

    const call = (method: "get" | "post", path: string, token?: string) =>
      api.request({
        method,
        url: path,
        maxRedirects: 0,
        validateStatus: () => true,
        headers: {
          "x-publishable-api-key": pk,
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      })

    async function signUp() {
      const email = `user${++seq}@example.com`
      const reg = await api.post("/auth/customer/emailpass/register", {
        email,
        password: "supersecret1",
      })
      const created = await api.post(
        "/store/customers",
        { email },
        {
          headers: {
            authorization: `Bearer ${reg.data.token}`,
            "x-publishable-api-key": pk,
          },
        }
      )
      const login = await api.post("/auth/customer/emailpass", {
        email,
        password: "supersecret1",
      })
      return {
        id: created.data.customer.id as string,
        email,
        token: login.data.token as string,
      }
    }

    type Payment = {
      amount: number
      captured_amount?: number
      refunded_amount?: number
    }

    // Builds a customer's order with one entitlement. `payment` controls the
    // real payment collection Medusa derives payment state from.
    async function seed(options: {
      payment?: Payment
      max_downloads?: number
      orderStatus?: string
    }) {
      const container = getContainer()
      const customer = await signUp()
      const orders = container.resolve(Modules.ORDER)
      const service: DigitalDeliveryModuleService = container.resolve(
        DIGITAL_DELIVERY_MODULE
      )

      const order = (await orders.createOrders({
        currency_code: "usd",
        email: customer.email,
        customer_id: customer.id,
        ...(options.orderStatus ? { status: options.orderStatus } : {}),
        items: [
          { title: "Course", quantity: 1, unit_price: 10, product_id: "prod_dl" },
        ],
      } as never)) as unknown as { id: string }

      if (options.payment) {
        const payments = container.resolve(Modules.PAYMENT)
        const link = container.resolve(ContainerRegistrationKeys.LINK)
        const collection = await payments.createPaymentCollections({
          currency_code: "usd",
          amount: options.payment.amount,
        })
        await payments.updatePaymentCollections(collection.id, {
          captured_amount: options.payment.captured_amount ?? 0,
          refunded_amount: options.payment.refunded_amount ?? 0,
        } as never)
        await link.create({
          [Modules.ORDER]: { order_id: order.id },
          [Modules.PAYMENT]: { payment_collection_id: collection.id },
        })
      }

      const file = await service.createDigitalFiles({
        product_id: "prod_dl",
        title: "Course PDF",
        file_key: `digital/${seq}/course.pdf`,
        file_name: "course.pdf",
        max_downloads: options.max_downloads ?? 3,
      })
      const granted = await service.grant({
        order_id: order.id,
        customer_id: customer.id,
        email: customer.email,
        digital_file_id: file.id,
        max_downloads: options.max_downloads ?? 3,
      })
      return {
        customer,
        service,
        order,
        entitlementId: granted.id,
        emailToken: granted.token,
      }
    }

    const PAID: Payment = { amount: 10, captured_amount: 10 }
    const tokenFromUrl = (url: string) => url.split("/downloads/")[1]

    describe("authorization", () => {
      it("rejects anonymous list and regenerate requests", async () => {
        const { entitlementId } = await seed({ payment: PAID })
        expect((await call("get", "/store/customer/downloads")).status).toBe(401)
        expect(
          (await call("post", `/store/customer/downloads/${entitlementId}/link`))
            .status
        ).toBe(401)
      })

      it("returns 404 (not 403) for another customer's entitlement and changes nothing", async () => {
        const owner = await seed({ payment: PAID })
        const stranger = await signUp()

        const res = await call(
          "post",
          `/store/customer/downloads/${owner.entitlementId}/link`,
          stranger.token
        )
        expect(res.status).toBe(404)

        const list = await call("get", "/store/customer/downloads", stranger.token)
        expect(list.data.downloads).toEqual([])

        // The owner's emailed link still works: nothing was rotated.
        const stillValid = await owner.service.checkToken(owner.emailToken)
        expect(stillValid.ok).toBe(true)
      })

      it("404s for an id that does not exist", async () => {
        const { customer } = await seed({ payment: PAID })
        const res = await call(
          "post",
          "/store/customer/downloads/dent_missing/link",
          customer.token
        )
        expect(res.status).toBe(404)
      })
    })

    describe("token safety", () => {
      it("never exposes tokens or hashes in the list response", async () => {
        const { customer, emailToken, service, entitlementId } = await seed({
          payment: PAID,
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.status).toBe(200)

        const body = JSON.stringify(list.data)
        const [entitlement] = await service.listDownloadEntitlements({
          id: entitlementId,
        })
        expect(body).not.toContain(emailToken)
        expect(body).not.toContain(entitlement.token_hash)
        expect(body).not.toMatch(/token/i)
        expect(list.headers["cache-control"]).toContain("no-store")
      })

      it("stores only a hash of the regenerated token", async () => {
        const { customer, entitlementId, service } = await seed({ payment: PAID })
        const res = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        const token = tokenFromUrl(res.data.download_url)
        const [row] = await service.listDownloadEntitlements({ id: entitlementId })
        expect(row.token_hash).not.toBe(token)
        expect(row.token_hash).toHaveLength(64)
        expect(res.headers["cache-control"]).toContain("no-store")
      })
    })

    describe("captured payment", () => {
      it("shows Available, issues a working link and kills the old one", async () => {
        const { customer, entitlementId, emailToken } = await seed({
          payment: PAID,
        })

        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("available")

        const res = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        expect(res.status).toBe(201)
        expect(res.data.download_url).toMatch(
          /^https:\/\/api\.nuprix\.test\/downloads\/[A-Za-z0-9_-]{40,}$/
        )
        expect(res.data.replaces_previous_link).toBe(true)

        const fresh = tokenFromUrl(res.data.download_url)
        const ok = await call("get", `/downloads/${fresh}`)
        expect(ok.status).toBe(302)
        expect(ok.headers.location).toContain("X-Amz-Signature")

        const old = await call("get", `/downloads/${emailToken}`)
        expect(old.status).toBe(404)
      })

      it("does not consume a download or reset the counter when rotating", async () => {
        const { customer, entitlementId, service } = await seed({
          payment: PAID,
          max_downloads: 3,
        })
        const first = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        await call("get", `/downloads/${tokenFromUrl(first.data.download_url)}`)

        await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        const row = await service.retrieveDownloadEntitlement(entitlementId)
        expect(row.download_count).toBe(1)
      })
    })

    describe("payment gating", () => {
      it("unpaid order: Awaiting payment, no link, nothing rotated", async () => {
        const { customer, entitlementId, service, emailToken } = await seed({
          payment: { amount: 10 },
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("awaiting_payment")

        const res = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        expect(res.status).toBe(402)
        expect(res.data.download_url).toBeUndefined()
        expect((await service.checkToken(emailToken)).ok).toBe(true)
      })

      it("order with no payment collection is treated as unpaid", async () => {
        const { customer, entitlementId } = await seed({})
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("awaiting_payment")
        const res = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        expect(res.status).toBe(402)
      })

      it("partially captured payment is still Awaiting payment", async () => {
        const { customer, entitlementId } = await seed({
          payment: { amount: 10, captured_amount: 4 },
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("awaiting_payment")
        expect(
          (
            await call(
              "post",
              `/store/customer/downloads/${entitlementId}/link`,
              customer.token
            )
          ).status
        ).toBe(402)
      })

      it("refunded order: Refunded, no new link, old email link refused", async () => {
        const { customer, entitlementId, emailToken } = await seed({
          payment: { amount: 10, captured_amount: 10, refunded_amount: 10 },
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("refunded")

        const res = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        expect(res.status).toBe(402)
        expect((await call("get", `/downloads/${emailToken}`)).status).toBe(402)
      })

      it("canceled order: not available and no link", async () => {
        const { customer, entitlementId } = await seed({
          payment: PAID,
          orderStatus: "canceled",
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("order_canceled")
        expect(
          (
            await call(
              "post",
              `/store/customer/downloads/${entitlementId}/link`,
              customer.token
            )
          ).status
        ).toBe(402)
      })

      it("the dev flag never serves a refunded order", async () => {
        process.env.DIGITAL_ALLOW_UNCAPTURED = "true"
        try {
          const { customer, entitlementId } = await seed({
            payment: { amount: 10, captured_amount: 10, refunded_amount: 10 },
          })
          expect(
            (
              await call(
                "post",
                `/store/customer/downloads/${entitlementId}/link`,
                customer.token
              )
            ).status
          ).toBe(402)
        } finally {
          delete process.env.DIGITAL_ALLOW_UNCAPTURED
        }
      })
    })

    describe("expiry, limits and revocation", () => {
      it("expired: status Expired, no new link", async () => {
        const { customer, entitlementId, service } = await seed({ payment: PAID })
        await service.updateDownloadEntitlements({
          id: entitlementId,
          expires_at: new Date(Date.now() - 1000),
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("expired")
        const res = await call(
          "post",
          `/store/customer/downloads/${entitlementId}/link`,
          customer.token
        )
        expect(res.status).toBe(410)
      })

      it("limit reached: status Limit reached, no new link", async () => {
        const { customer, entitlementId, service } = await seed({
          payment: PAID,
          max_downloads: 1,
        })
        await service.updateDownloadEntitlements({
          id: entitlementId,
          download_count: 1,
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("limit_reached")
        expect(
          (
            await call(
              "post",
              `/store/customer/downloads/${entitlementId}/link`,
              customer.token
            )
          ).status
        ).toBe(410)
      })

      it("revoked: status Revoked, no new link", async () => {
        const { customer, entitlementId, service } = await seed({ payment: PAID })
        await service.updateDownloadEntitlements({
          id: entitlementId,
          revoked_at: new Date(),
        })
        const list = await call("get", "/store/customer/downloads", customer.token)
        expect(list.data.downloads[0].status).toBe("revoked")
        expect(
          (
            await call(
              "post",
              `/store/customer/downloads/${entitlementId}/link`,
              customer.token
            )
          ).status
        ).toBe(410)
      })
    })

    describe("repeated and concurrent requests", () => {
      it("sequential regenerations leave only the latest link valid", async () => {
        const { customer, entitlementId, service } = await seed({ payment: PAID })
        const tokens: string[] = []
        for (let i = 0; i < 4; i++) {
          const res = await call(
            "post",
            `/store/customer/downloads/${entitlementId}/link`,
            customer.token
          )
          expect(res.status).toBe(201)
          tokens.push(tokenFromUrl(res.data.download_url))
        }
        expect(new Set(tokens).size).toBe(4)

        const results = await Promise.all(
          tokens.map((t) => service.checkToken(t))
        )
        expect(results.map((r) => r.ok)).toEqual([false, false, false, true])
      })

      it("parallel regenerations never error and leave exactly one valid link", async () => {
        const { customer, entitlementId, service } = await seed({ payment: PAID })
        const responses = await Promise.all(
          Array.from({ length: 5 }, () =>
            call(
              "post",
              `/store/customer/downloads/${entitlementId}/link`,
              customer.token
            )
          )
        )
        expect(responses.every((r) => r.status === 201)).toBe(true)

        const tokens = responses.map((r) => tokenFromUrl(r.data.download_url))
        const checks = await Promise.all(tokens.map((t) => service.checkToken(t)))
        expect(checks.filter((c) => c.ok)).toHaveLength(1)
      })

      it("rate limits regeneration per customer", async () => {
        const { customer, entitlementId } = await seed({ payment: PAID })
        const statuses: number[] = []
        for (let i = 0; i < 9; i++) {
          statuses.push(
            (
              await call(
                "post",
                `/store/customer/downloads/${entitlementId}/link`,
                customer.token
              )
            ).status
          )
        }
        expect(statuses.filter((s) => s === 201)).toHaveLength(6)
        expect(statuses.filter((s) => s === 429).length).toBeGreaterThanOrEqual(3)
      })

      it("one customer's rate limit does not block another customer", async () => {
        const a = await seed({ payment: PAID })
        const b = await seed({ payment: PAID })
        for (let i = 0; i < 8; i++) {
          await call(
            "post",
            `/store/customer/downloads/${a.entitlementId}/link`,
            a.customer.token
          )
        }
        const res = await call(
          "post",
          `/store/customer/downloads/${b.entitlementId}/link`,
          b.customer.token
        )
        expect(res.status).toBe(201)
      })
    })
  },
})
