import { logger as defaultLogger } from "@medusajs/framework/logger"
import { defineConfig, loadEnv } from "@medusajs/framework/utils"
import { createTokenRedactingLogger } from "./src/lib/http-log-redaction"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

// Medusa's HTTP logger writes request paths through Logger.http. Download
// tokens are bearer credentials, so redact them before any HTTP log sink sees
// the formatted message.
const logger = createTokenRedactingLogger(defaultLogger)

module.exports = defineConfig({
  logger,
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-postgres",
            id: "locking-postgres",
            is_default: true,
          },
        ],
      },
    },
    { resolve: "./src/modules/digital-delivery" },
    // Order and download emails go through Resend when a key is set. Without
    // one, Medusa keeps its default local (feed-only) notification provider.
    ...(process.env.RESEND_API_KEY
      ? [
          {
            resolve: "@medusajs/medusa/notification",
            options: {
              providers: [
                {
                  resolve: "./src/modules/resend",
                  id: "resend",
                  options: {
                    channels: ["email"],
                    api_key: process.env.RESEND_API_KEY,
                    from: process.env.RESEND_FROM_EMAIL,
                  },
                },
              ],
            },
          },
        ]
      : []),
  ],
})
