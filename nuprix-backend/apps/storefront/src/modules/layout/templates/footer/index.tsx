import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { BadgeCheck, PackageCheck, ShieldCheck } from "lucide-react"

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  return (
    <footer className="mt-20 border-t border-slate-800 bg-nuprix-ink text-white">
      <div className="content-container">
        <div className="grid gap-12 py-14 small:grid-cols-[1.35fr_2fr] small:py-16">
          <div className="max-w-sm">
            <LocalizedClientLink href="/" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-nuprix-indigo text-sm font-bold text-white">N</span>
              <span className="text-xl font-bold tracking-[-0.04em]">nuprix</span>
            </LocalizedClientLink>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              A unified marketplace for instant digital assets and verified physical products.
            </p>
            <div className="mt-6 grid gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-indigo-400" />Buyer protection</span>
              <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-violet-400" />Digital license delivery</span>
              <span className="flex items-center gap-2"><PackageCheck className="h-4 w-4 text-emerald-400" />Verified physical fulfillment</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 small:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Marketplace</p>
              <ul className="mt-4 space-y-3 text-sm">
                {productCategories?.filter((category) => !category.parent_category_id).slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink href={`/categories/${category.handle}`} className="text-slate-300 transition hover:text-white" data-testid="category-link">
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Collections</p>
              <ul className="mt-4 space-y-3 text-sm">
                {collections?.slice(0, 6).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink href={`/collections/${collection.handle}`} className="text-slate-300 transition hover:text-white">
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Help</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  ["About", "/about"],
                  ["FAQ", "/faq"],
                  ["Shipping", "/shipping"],
                  ["Returns", "/returns"],
                  ["Digital License", "/digital-license"],
                  ["Terms", "/terms"],
                  ["Privacy", "/privacy"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <LocalizedClientLink href={href} className="text-slate-300 transition hover:text-white">{label}</LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 py-6 text-xs text-slate-400 small:flex-row">
          <p>© {new Date().getFullYear()} Nuprix. All rights reserved.</p>
          <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Digital + physical marketplace</p>
        </div>
      </div>
    </footer>
  )
}
