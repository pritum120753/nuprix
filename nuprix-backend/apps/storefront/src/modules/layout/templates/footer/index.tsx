import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  return (
    <footer className="border-t border-nuprix-line bg-nuprix-paper w-full mt-24">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-16 small:py-24">
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-nuprix-forest"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-nuprix-forest text-xs font-bold text-nuprix-ivory">
                N
              </span>
              <span className="font-display tracking-tight text-2xl lowercase">nuprix</span>
            </LocalizedClientLink>
            <p className="mt-4 text-sm leading-6 text-nuprix-muted">
              Thoughtfully curated everyday essentials and instant digital downloads in a single unified catalog.
            </p>
          </div>

          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-nuprix-forest">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2.5" data-testid="footer-categories">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category_id) return null
                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-nuprix-muted hover:text-nuprix-forest transition-colors text-sm"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-nuprix-forest">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-2.5">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-nuprix-muted hover:text-nuprix-forest transition-colors text-sm"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-nuprix-forest">
                Help & Information
              </span>
              <ul className="grid grid-cols-1 gap-2.5 text-sm">
                <li>
                  <LocalizedClientLink
                    className="text-nuprix-muted hover:text-nuprix-forest transition-colors"
                    href="/shipping"
                  >
                    Shipping Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-nuprix-muted hover:text-nuprix-forest transition-colors"
                    href="/returns"
                  >
                    Returns & Refunds
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-nuprix-muted hover:text-nuprix-forest transition-colors"
                    href="/terms"
                  >
                    Terms of Service
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-nuprix-muted hover:text-nuprix-forest transition-colors"
                    href="/privacy"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-nuprix-muted hover:text-nuprix-forest transition-colors"
                    href="/contact"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full py-8 border-t border-nuprix-line flex-col sm:flex-row items-center justify-between text-xs text-nuprix-muted gap-4">
          <Text className="text-xs text-nuprix-muted">
            © {new Date().getFullYear()} Nuprix. All rights reserved.
          </Text>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-nuprix-moss" />
              Verified Digital & Physical Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
