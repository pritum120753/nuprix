import { renderTemplate } from "../templates"

describe("resend templates", () => {
  it("returns null for an unknown template", () => {
    expect(renderTemplate("nope", {})).toBeNull()
  })

  it("escapes customer-controlled text", () => {
    const email = renderTemplate("digital-download", {
      display_id: 7,
      downloads: [
        {
          title: "<script>alert(1)</script>",
          file_name: "a&b.pdf",
          url: "https://shop.example/downloads/abc",
          max_downloads: 3,
          expires_at: null,
        },
      ],
    })

    expect(email?.subject).toContain("order #7")
    expect(email?.html).not.toContain("<script>")
    expect(email?.html).toContain("&lt;script&gt;")
    expect(email?.html).toContain("a&amp;b.pdf")
  })

  it("never renders a non-http link", () => {
    const email = renderTemplate("digital-download", {
      downloads: [
        {
          title: "x",
          file_name: "x.pdf",
          url: "javascript:alert(1)",
          max_downloads: 1,
          expires_at: null,
        },
      ],
    })
    expect(email?.html).not.toContain("javascript:")
    expect(email?.html).toContain('href="#"')
  })

  it("renders password-reset template with safe http(s) link", () => {
    const email = renderTemplate("password-reset", {
      reset_url: "https://nuprix.example/reset-password?token=tok_123",
    })
    expect(email?.subject).toBe("Reset your Nuprix password")
    expect(email?.html).toContain(
      "https://nuprix.example/reset-password?token=tok_123"
    )
    expect(email?.text).toContain(
      "https://nuprix.example/reset-password?token=tok_123"
    )

    const unsafe = renderTemplate("password-reset", {
      reset_url: "javascript:alert(1)",
    })
    expect(unsafe?.html).not.toContain("javascript:")
    expect(unsafe?.html).toContain('href="#"')
  })
})
