import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export function GET(_req: MedusaRequest, res: MedusaResponse) {
  const missing: string[] = []
  const databaseUrl = process.env.DATABASE_URL?.trim()
  const jwtSecret = process.env.JWT_SECRET?.trim()
  const cookieSecret = process.env.COOKIE_SECRET?.trim()

  if (!databaseUrl) {
    missing.push("DATABASE_URL")
  }

  if (process.env.NODE_ENV === "production") {
    if (!jwtSecret || jwtSecret.startsWith("replace-with")) {
      missing.push("JWT_SECRET")
    }
    if (!cookieSecret || cookieSecret.startsWith("replace-with")) {
      missing.push("COOKIE_SECRET")
    }

    if (databaseUrl) {
      try {
        const parsed = new URL(databaseUrl)
        const sslMode = parsed.searchParams.get("sslmode")?.toLowerCase()
        const sslEnabled =
          process.env.DATABASE_SSL === "true" ||
          Boolean(process.env.DATABASE_CA_CERT?.trim()) ||
          Boolean(process.env.DATABASE_CA_CERT_PATH?.trim()) ||
          ["require", "verify-ca", "verify-full"].includes(sslMode ?? "") ||
          (!["localhost", "127.0.0.1", "::1"].includes(parsed.hostname) &&
            process.env.DATABASE_SSL !== "false")

        if (!sslEnabled) {
          missing.push("DATABASE_SSL")
        }
      } catch {
        missing.push("DATABASE_URL")
      }
    }
  }

  if (missing.length > 0) {
    res.status(503).json({
      status: "not_ready",
      missing,
    })
    return
  }

  res.status(200).json({
    status: "ready",
  })
}
