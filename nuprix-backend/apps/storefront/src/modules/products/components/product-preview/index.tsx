import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { ArrowUpRight, Download, Package } from "lucide-react"
import { getProductFulfillmentType } from "@lib/util/product"

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
  const fulfillmentType = getProductFulfillmentType(product)

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            alt={product.title}
            size="full"
            isFeatured={isFeatured}
            className="rounded-[1.35rem] border border-[#e6eae3] bg-[#eef1eb] p-3 shadow-none transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_45px_rgba(28,48,34,0.12)]"
          />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-nuprix-pine shadow-sm backdrop-blur">
            {fulfillmentType === "digital" ? (
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {fulfillmentType === "mixed" ? "Physical + digital" : fulfillmentType}
          </span>
          <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-nuprix-forest text-white opacity-0 shadow-lift transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-1 items-start justify-between gap-3 px-1 pt-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-[#24372a] transition-colors group-hover:text-[#548365] small:text-base">
              {product.title}
            </h3>
            {product.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#788279] small:text-sm">
                {product.description}
              </p>
            )}
          </div>
          {cheapestPrice && (
            <div className="shrink-0 pt-0.5 text-sm font-semibold text-[#24372a]">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
        </div>
        <span className="mt-4 inline-flex w-fit items-center gap-2 border-b border-[#b8c9ba] pb-1 text-xs font-semibold text-[#42644d] transition-colors group-hover:border-[#42644d]">
          View product <span aria-hidden="true">→</span>
        </span>
      </article>
    </LocalizedClientLink>
  )
}
