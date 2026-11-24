const sendMock = jest.fn()

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}))

import ResendNotificationProviderService from "../service"
import { renderTemplate } from "../templates"

const logger = { error: jest.fn() } as never
const options = { api_key: "re_x", from: "Nuprix <orders@example.com>" }

describe("ResendNotificationProviderService", () => {
  beforeEach(() => {
    sendMock.mockReset()
  })

  it("requires api_key and from", () => {
    expect(() => ResendNotificationProviderService.validateOptions({ from: "a" })).toThrow(
      /api_key/
    )
    expect(() =>
      ResendNotificationProviderService.validateOptions({ api_key: "k" })
    ).toThrow(/from/)
    expect(() =>
      ResendNotificationProviderService.validateOptions(options)
    ).not.toThrow()
  })

  it("sends a rendered email and returns the provider id", async () => {
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null })
    const service = new ResendNotificationProviderService({ logger }, options)

    const result = await service.send({
      to: "buyer@example.com",
      channel: "email",
      template: "digital-download",
      data: { downloads: [] },
    } as never)

    expect(result).toEqual({ id: "email_1" })
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: options.from,
        to: ["buyer@example.com"],
      })
    )
  })

  it("escapes vendor product approval and rejection template values", () => {
    const approved = renderTemplate("vendor-product-approved", {
      vendor_name: "Studio <script>alert(1)</script>",
      product_id: "<img src=x onerror=alert(1)>",
      commission_rate_bps: 1250,
    })
    expect(approved?.html).toContain("Studio &lt;script&gt;")
    expect(approved?.html).toContain("&lt;img src=x onerror=alert(1)&gt;")
    expect(approved?.html).not.toContain("<script>")
    expect(approved?.html).toContain("12.50%")

    const rejected = renderTemplate("vendor-product-rejected", {
      vendor_name: "Studio & Co",
      product_id: "prod_<b>unsafe</b>",
      rejection_reason: "Fix <script>alert(1)</script> first",
    })
    expect(rejected?.html).toContain("Studio &amp; Co")
    expect(rejected?.html).toContain("prod_&lt;b&gt;unsafe&lt;/b&gt;")
    expect(rejected?.html).toContain("Fix &lt;script&gt;")
    expect(rejected?.html).not.toContain("<script>")
  })

  it("throws for an unknown template without calling Resend", async () => {
    const service = new ResendNotificationProviderService({ logger }, options)
    await expect(
      service.send({ to: "a@b.c", channel: "email", template: "nope", data: {} } as never)
    ).rejects.toThrow(/No email template/)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it("throws when Resend returns an error", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "bad from" },
    })
    const service = new ResendNotificationProviderService({ logger }, options)
    await expect(
      service.send({
        to: "a@b.c",
        channel: "email",
        template: "digital-download",
        data: {},
      } as never)
    ).rejects.toThrow(/Failed to send email/)
  })
})
