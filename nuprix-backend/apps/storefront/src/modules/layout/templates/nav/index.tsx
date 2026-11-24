import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"
import { PackageCheck, ShoppingCart, Store, UserRound } from "lucide-react"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  const trending = [
    ["AI Tools", "/store"],
    ["Software & Keys", "/store"],
    ["Subscriptions", "/store"],
    ["Windows & Office", "/store"],
    ["Gaming", "/store"],
    ["Physical Gear", "/store"],
  ] as const

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="border-b border-nuprix-line bg-white/95 backdrop-blur-md">
        <nav className="content-container grid h-[64px] grid-cols-[auto_1fr_auto] items-center gap-2 text-sm text-nuprix-muted small:gap-4">
          <div className="flex h-full min-w-0 items-center gap-2">
            <LocalizedClientLink href="/" className="flex shrink-0 items-center gap-2" data-testid="nav-store-link">
              <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-nuprix-indigo text-sm font-bold text-white">N</span>
              <span className="hidden text-xl font-bold tracking-[-0.04em] text-nuprix-ink medium:inline">nuprix</span>
            </LocalizedClientLink>
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="min-w-0">
            <Search
              trigger={
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="shrink-0 text-nuprix-muted">Search</span>
                  <span className="hidden truncate text-nuprix-subtle small:inline">
                    software, keys, AI subscriptions, and physical gear
                  </span>
                </span>
              }
              triggerClassName="flex h-10 w-full items-center rounded-lg border border-nuprix-line bg-nuprix-mist/60 px-3 text-xs text-nuprix-muted outline-none transition hover:border-nuprix-indigo/30 hover:bg-white focus-visible:ring-2 focus-visible:ring-nuprix-indigo/20 small:text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-1.5">
            <LocalizedClientLink
              href="/account/orders"
              className="hidden h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-semibold text-nuprix-muted hover:bg-nuprix-mist small:flex"
            >
              <PackageCheck className="h-4 w-4" aria-hidden="true" />
              <span className="hidden medium:inline">Orders</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hidden h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-semibold text-nuprix-muted hover:bg-nuprix-mist small:flex"
              href="/account"
              data-testid="nav-account-link"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              <span className="hidden medium:inline">Account</span>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink className="grid h-10 w-10 place-items-center rounded-lg border border-nuprix-line" href="/cart" data-testid="nav-cart-link">
                  <ShoppingCart className="h-4 w-4" />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            <LocalizedClientLink
              href="/account/vendor"
              className="hidden h-10 items-center gap-2 rounded-lg bg-nuprix-indigo px-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,.16)] hover:bg-nuprix-indigo-hover medium:flex"
            >
              <Store className="h-4 w-4" aria-hidden="true" />
              Start Selling
            </LocalizedClientLink>
          </div>
        </nav>
        <div className="no-scrollbar overflow-x-auto border-t border-nuprix-line/80 bg-nuprix-ivory">
          <div className="content-container flex min-w-max items-center gap-2 py-2">
            {trending.map(([label, href]) => (
              <LocalizedClientLink
                key={label}
                href={href}
                className="rounded-full border border-nuprix-line bg-white px-3 py-1.5 text-xs font-semibold text-nuprix-muted transition hover:border-nuprix-indigo/30 hover:text-nuprix-indigo"
              >
                {label}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </header>
    </div>
  )
}
