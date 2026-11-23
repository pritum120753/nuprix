import { createHash } from "crypto"
import {
  decryptLicenseKey,
  generateLicenseKey,
} from "../license-keys"

describe("license keys", () => {
  const originalKey = process.env.DIGITAL_LICENSE_ENCRYPTION_KEY

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.DIGITAL_LICENSE_ENCRYPTION_KEY
    } else {
      process.env.DIGITAL_LICENSE_ENCRYPTION_KEY = originalKey
    }
  })

  it("generates unique keys that can be decrypted and hashed consistently", () => {
    process.env.DIGITAL_LICENSE_ENCRYPTION_KEY = "a".repeat(64)

    const first = generateLicenseKey()
    const second = generateLicenseKey()

    expect(first.value).toMatch(/^NPRX-(?:[0-9A-F]{4}-){3}[0-9A-F]{4}$/)
    expect(first.value).not.toBe(second.value)
    expect(first.hash).toBe(
      createHash("sha256").update(first.value).digest("hex")
    )
    expect(decryptLicenseKey(first.encrypted)).toBe(first.value)
  })

  it("requires a 256-bit encryption key before issuing or reading keys", () => {
    delete process.env.DIGITAL_LICENSE_ENCRYPTION_KEY

    expect(() => generateLicenseKey()).toThrow(
      "DIGITAL_LICENSE_ENCRYPTION_KEY must be configured"
    )
    expect(() => decryptLicenseKey("invalid.encrypted.value")).toThrow(
      "DIGITAL_LICENSE_ENCRYPTION_KEY must be configured"
    )
  })

  it("rejects malformed or tampered encrypted keys", () => {
    process.env.DIGITAL_LICENSE_ENCRYPTION_KEY = "b".repeat(64)
    const generated = generateLicenseKey()
    process.env.DIGITAL_LICENSE_ENCRYPTION_KEY = "c".repeat(64)

    expect(() => decryptLicenseKey(generated.encrypted)).toThrow()
    expect(() => decryptLicenseKey("invalid")).toThrow(
      "Stored license key has an invalid encrypted format."
    )
  })
})
