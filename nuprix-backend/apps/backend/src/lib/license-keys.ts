import { MedusaError } from "@medusajs/framework/utils"
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto"

const ALGORITHM = "aes-256-gcm"

function encryptionKey(): Buffer {
  const configured = process.env.DIGITAL_LICENSE_ENCRYPTION_KEY
  if (!configured || !/^[\da-f]{64}$/i.test(configured)) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      "DIGITAL_LICENSE_ENCRYPTION_KEY must be configured as 64 hexadecimal characters before license keys can be issued or read."
    )
  }
  return Buffer.from(configured, "hex")
}

export type GeneratedLicenseKey = {
  value: string
  encrypted: string
  hash: string
}

export function generateLicenseKey(): GeneratedLicenseKey {
  const serial = randomBytes(8).toString("hex").toUpperCase()
  const groups = serial.match(/.{4}/g)
  if (!groups) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      "Could not generate a license key."
    )
  }
  const value = `NPRX-${groups.join("-")}`
  const iv = randomBytes(12)
  const cipher = createCipheriv(ALGORITHM, encryptionKey(), iv)
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()

  return {
    value,
    encrypted: [iv, tag, encrypted]
      .map((part) => part.toString("base64url"))
      .join("."),
    hash: createHash("sha256").update(value).digest("hex"),
  }
}

export function decryptLicenseKey(encrypted: string): string {
  const [encodedIv, encodedTag, encodedValue] = encrypted.split(".")
  if (!encodedIv || !encodedTag || !encodedValue) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      "Stored license key has an invalid encrypted format."
    )
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    encryptionKey(),
    Buffer.from(encodedIv, "base64url")
  )
  decipher.setAuthTag(Buffer.from(encodedTag, "base64url"))
  return Buffer.concat([
    decipher.update(Buffer.from(encodedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8")
}
