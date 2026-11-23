import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"
import { UserRound } from "lucide-react"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-[72px] mx-auto border-b border-nuprix-line/80 bg-nuprix-paper/85 shadow-[0_8px_30px_rgba(22,53,40,0.04)] backdrop-blur-xl transition-colors duration-200">
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
              className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-nuprix-forest"
              data-testid="nav-store-link"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-nuprix-forest text-sm font-bold text-nuprix-ivory shadow-[0_8px_18px_rgba(22,53,40,0.18)] transition-transform duration-200 group-hover:-rotate-3">
                N
              </span>
              <span className="font-display tracking-[-0.04em] text-[27px] lowercase">nuprix</span>
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-2 xsmall:gap-x-3 h-full flex-1 basis-0 justify-end">
            <span className="hidden small:flex h-11 w-11 items-center justify-center rounded-full border border-nuprix-line bg-white text-nuprix-muted transition hover:border-nuprix-moss hover:text-nuprix-forest">
              <Search />
            </span>
            <div className="hidden small:flex items-center h-full">
              <LocalizedClientLink
                className="flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-nuprix-muted transition hover:bg-nuprix-mist hover:text-nuprix-forest"
                href="/account"
                data-testid="nav-account-link"
              >
                <UserRound className="h-4 w-4" aria-hidden="true" />
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
