import { sanitizeAuditPayload } from "../service"

describe("sanitizeAuditPayload", () => {
  it("redacts sensitive keys recursively while preserving safe fields", () => {
    const sanitized = sanitizeAuditPayload({
      id: "vnd_1",
      token: "raw-secret-token",
      nested: {
        api_key: "sk_live_123",
        password: "hunter2",
        status: "verified",
      },
      items: [{ upload_url: "https://s3.example/signed", title: "Kit" }],
    })

    expect(sanitized).toEqual({
      id: "vnd_1",
      token: "[REDACTED]",
      nested: {
        api_key: "[REDACTED]",
        password: "[REDACTED]",
        status: "verified",
      },
      items: [{ upload_url: "[REDACTED]", title: "Kit" }],
    })
  })

  it("returns null for empty payloads", () => {
    expect(sanitizeAuditPayload(null)).toBeNull()
    expect(sanitizeAuditPayload(undefined)).toBeNull()
  })
})
