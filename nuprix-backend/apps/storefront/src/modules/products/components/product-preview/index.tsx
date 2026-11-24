import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { ArrowUpRight, Download, Package } from "lucide-react"
import { getProductFulfillmentType } from "@lib/util/product"
import { retrieveProductClassification } from "@lib/data/products"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const classification = await retrieveProductClassification(product.id)
  const fulfillmentType = getProductFulfillmentType(product, classification)

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative rounded-[16px] border border-nuprix-line bg-nuprix-mist p-1 transition duration-300 group-hover:-translate-y-1 group-hover:border-nuprix-line-strong group-hover:shadow-[0_18px_40px_rgba(15,23,42,.10)]">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            alt={product.title}
            size="full"
            isFeatured={isFeatured}
            className="rounded-[12px] bg-nuprix-mist p-0 shadow-none"
          />
          <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.10em] shadow-sm backdrop-blur ${
            fulfillmentType === "digital"
              ? "border-violet-200 bg-violet-50/95 text-violet-700"
              : fulfillmentType === "mixed"
                ? "border-indigo-200 bg-indigo-50/95 text-indigo-700"
                : fulfillmentType === "physical"
                  ? "border-emerald-200 bg-emerald-50/95 text-emerald-700"
                  : "border-slate-200 bg-white/95 text-slate-600"
          }`}>
            {fulfillmentType === "digital" ? (
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {fulfillmentType === "digital"
              ? "Instant Digital"
              : fulfillmentType === "mixed"
                ? "Digital + Physical"
                : fulfillmentType === "physical"
                  ? "Ships Physical"
                  : "Fulfillment pending"}
          </span>
          <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-nuprix-ink text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-1 items-start justify-between gap-3 px-1 pt-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-bold leading-6 text-nuprix-ink transition-colors group-hover:text-nuprix-indigo small:text-base">
              {product.title}
            </h3>
            {product.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-nuprix-muted small:text-sm">
                {product.description}
              </p>
            )}
          </div>
          {cheapestPrice && (
            <div className="shrink-0 pt-0.5 text-sm font-bold tabular-nums text-nuprix-ink">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
        </div>
        <span className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-bold text-nuprix-indigo transition-colors group-hover:text-nuprix-indigo-hover">
          View product <span aria-hidden="true">→</span>
        </span>
      </article>
    </LocalizedClientLink>
  )
}
