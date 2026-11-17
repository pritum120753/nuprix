import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b transition-colors duration-200 bg-white/90 backdrop-blur-md border-nuprix-line">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular text-nuprix-subtle">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <div className="hidden medium:flex items-center gap-x-6 ml-6">
              <LocalizedClientLink
                href="/store"
                className="text-sm font-medium text-nuprix-muted hover:text-nuprix-forest transition-colors"
              >
                Catalog
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/search"
                className="text-sm font-medium text-nuprix-muted hover:text-nuprix-forest transition-colors"
              >
                Search
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-nuprix-forest"
              data-testid="nav-store-link"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nuprix-forest text-sm font-bold text-nuprix-ivory shadow-sm">
                N
              </span>
              <span className="font-display tracking-tight text-2xl lowercase">nuprix</span>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-4 xsmall:gap-x-6 h-full flex-1 basis-0 justify-end">
            <Search />
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="text-sm font-medium text-nuprix-muted hover:text-nuprix-forest transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-sm font-medium text-nuprix-muted hover:text-nuprix-forest flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
