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
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="h-[72px] border-b border-nuprix-line/90 bg-white/85 backdrop-blur-md">
        <nav className="content-container grid h-full grid-cols-[auto_1fr_auto] items-center gap-3 text-sm text-nuprix-muted small:grid-cols-[1fr_minmax(320px,560px)_1fr] small:gap-6">
          <div className="flex h-full items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <LocalizedClientLink
              href="/"
              className="hidden small:flex items-center gap-2 mr-5"
              data-testid="nav-store-link"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-nuprix-indigo text-sm font-bold text-white">N</span>
              <span className="text-[21px] font-bold tracking-[-0.04em] text-nuprix-ink">nuprix</span>
            </LocalizedClientLink>
            <div className="hidden medium:flex items-center gap-x-4">
              <LocalizedClientLink
                href="/store"
                className="text-sm font-medium text-nuprix-muted hover:text-nuprix-ink transition-colors"
              >
                Explore
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store?digital=true"
                className="text-sm font-medium text-nuprix-muted hover:text-nuprix-ink transition-colors"
              >
                Digital Assets
              </LocalizedClientLink>
              <LocalizedClientLink href="/store?physical=true" className="text-sm font-medium text-nuprix-muted hover:text-nuprix-ink transition-colors">
                Physical Goods
              </LocalizedClientLink>
              <LocalizedClientLink href="/account/vendor" className="text-sm font-medium text-nuprix-muted hover:text-nuprix-ink transition-colors">
                Sell on Nuprix
              </LocalizedClientLink>
            </div>
          </div>

          <div className="min-w-0">
            <Search
              trigger={
                <span className="flex w-full items-center gap-2.5">
                  <span className="text-nuprix-muted">Search</span>
                  <span className="hidden truncate text-nuprix-subtle small:inline">
                    software, templates, license keys, and gear
                  </span>
                </span>
              }
              triggerClassName="flex h-11 w-full items-center rounded-xl border border-nuprix-line bg-nuprix-mist/60 px-3.5 text-sm text-nuprix-muted outline-none transition hover:border-nuprix-line-strong hover:bg-white focus-visible:ring-2 focus-visible:ring-nuprix-indigo/20"
            />
          </div>

          <div className="flex items-center justify-end gap-1.5 h-full">
            <div className="hidden small:flex items-center h-full">
              <LocalizedClientLink
                className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-nuprix-muted transition hover:bg-nuprix-mist hover:text-nuprix-ink"
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
