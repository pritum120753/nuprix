import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

function resolveDatabaseCaCert(): string | undefined {
  if (process.env.DATABASE_CA_CERT?.trim()) {
    return process.env.DATABASE_CA_CERT.replace(/\\n/g, '\n')
  }

  const certPath = process.env.DATABASE_CA_CERT_PATH?.trim()
  if (certPath) {
    return readFileSync(path.resolve(process.cwd(), certPath), 'utf8')
  }

  const localCertPath = path.resolve(process.cwd(), 'supabase-ca.crt')
  if (existsSync(localCertPath)) {
    return readFileSync(localCertPath, 'utf8')
  }

  return undefined
}

const databaseCaCert = resolveDatabaseCaCert()
const useDatabaseSsl = Boolean(databaseCaCert) || process.env.DATABASE_SSL === 'true'
const databaseUrl = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : undefined
if (useDatabaseSsl) {
  databaseUrl?.searchParams.delete('sslmode')
}


module.exports = defineConfig({
  projectConfig: {
    databaseUrl: databaseUrl?.toString(),
    ...(useDatabaseSsl
      ? {
          databaseDriverOptions: {
            connection: {
              ssl: databaseCaCert
                ? {
                    ca: databaseCaCert,
                    rejectUnauthorized: true,
                  }
                : {
                    rejectUnauthorized: true,
                  },
            },
          },
        }
      : {}),
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    { resolve: "./src/modules/digital-delivery" },
    { resolve: "./src/modules/vendor" },
    { resolve: "./src/modules/audit-log" },
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
  admin: {
    vite: () => ({
      resolve: {
        alias: {
          "@medusajs/ui": path.resolve(
            process.cwd(),
            "node_modules/@medusajs/ui"
          ),
        },
      },
      plugins: [
        {
          name: "nuprix-admin-tailwind-config",
          enforce: "pre",
          transform(code, id) {
            const cssPath = id.split("?")[0].replace(/\\/g, "/")

            if (
              !cssPath.endsWith("/.medusa/client/index.css") ||
              code.includes("@config")
            ) {
              return null
            }

            return `@config "../../tailwind.config.js";\n${code}`
          },
        },
      ],
    }),
  },
})
