import { createHash, randomBytes } from "crypto"

export function hashDownloadToken(token: string): string {
  return createHash("sha256").update(token).digest("hex")
}

export function newDownloadToken(): string {
  return randomBytes(32).toString("base64url")
}
