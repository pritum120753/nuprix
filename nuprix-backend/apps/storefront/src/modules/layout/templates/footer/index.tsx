import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PackageCheck, ShieldCheck } from "lucide-react"

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  return (
    <footer className="mt-24 w-full overflow-hidden bg-nuprix-forest text-nuprix-ivory">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-16 small:py-20">
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-nuprix-ivory text-xs font-bold text-nuprix-forest">
                N
              </span>
              <span className="font-display tracking-[-0.04em] text-[27px] lowercase">nuprix</span>
            </LocalizedClientLink>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#cbd8cd]">
              Thoughtfully curated everyday essentials across a unified catalog.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[#dfe8df]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Secure checkout
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[#dfe8df]">
                <PackageCheck className="h-4 w-4" aria-hidden="true" />
                Mixed fulfillment
              </span>
            </div>
          </div>

          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2.5" data-testid="footer-categories">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category_id) return null
                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-[#bac9bd] hover:text-white transition-colors text-sm"
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
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-2.5">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-[#bac9bd] hover:text-white transition-colors text-sm"
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
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Help & Information
              </span>
              <ul className="grid grid-cols-1 gap-2.5 text-sm">
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/about"
                  >
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/faq"
                  >
                    FAQ
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/shipping"
                  >
                    Shipping Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/returns"
                  >
                    Returns & Refunds
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/refund-policy"
                  >
                    Refund Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/digital-license"
                  >
                    Digital License
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/terms"
                  >
                    Terms of Service
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/privacy"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="text-[#bac9bd] hover:text-white transition-colors"
                    href="/contact"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full py-8 border-t border-white/10 flex-col sm:flex-row items-center justify-between text-xs text-[#bac9bd] gap-4">
          <Text className="text-xs text-[#bac9bd]">
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
