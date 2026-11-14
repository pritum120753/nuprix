import type { Logger } from "@medusajs/framework/types"

const DOWNLOAD_TOKEN_IN_PATH = /(\/downloads\/)[A-Za-z0-9_-]{40,}/g

export function redactDownloadTokensFromHttpLog(message: string): string {
  return message.replace(DOWNLOAD_TOKEN_IN_PATH, "$1[REDACTED]")
}

export function createTokenRedactingLogger(logger: Logger): Logger {
  return new Proxy(logger, {
    get(target, property) {
      const value = Reflect.get(target, property, target)
      if (property === "http") {
        return (message: string) =>
          target.http(redactDownloadTokensFromHttpLog(message))
      }
      return typeof value === "function" ? value.bind(target) : value
    },
  })
}
