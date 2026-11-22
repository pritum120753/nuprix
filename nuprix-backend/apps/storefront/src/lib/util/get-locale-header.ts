import { getLocale } from "@lib/data/locale-actions"

export async function getLocaleHeader() {
  let locale: string | null

  if (typeof document !== "undefined") {
    const cookiePrefix = "_medusa_locale="
    const localeCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(cookiePrefix))

    locale = localeCookie?.slice(cookiePrefix.length) || null
  } else {
    locale = await getLocale()
  }

  return {
    "x-medusa-locale": locale,
  }
}
