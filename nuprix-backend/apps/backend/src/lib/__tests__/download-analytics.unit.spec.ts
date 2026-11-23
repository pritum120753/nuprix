import { createHash } from "crypto"
import {
  hashIpAddress,
  normalizeUserAgent,
} from "../download-analytics"

describe("download analytics data minimization", () => {
  it("hashes customer IP addresses with SHA-256 and a salt", () => {
    const expected = createHash("sha256")
      .update("test-salt:192.0.2.123")
      .digest("hex")

    expect(hashIpAddress("192.0.2.123", "test-salt")).toBe(expected)
    expect(hashIpAddress("192.0.2.123", "test-salt")).toHaveLength(64)
  })

  it("requires a telemetry salt", () => {
    expect(() => hashIpAddress("192.0.2.123", undefined)).toThrow(
      "DIGITAL_DOWNLOAD_IP_SALT must be configured"
    )
  })

  it("limits user-agent storage and normalizes empty values", () => {
    expect(normalizeUserAgent("")).toBeNull()
    expect(normalizeUserAgent("browser")).toBe("browser")
    expect(normalizeUserAgent("x".repeat(600))).toHaveLength(500)
  })
})
