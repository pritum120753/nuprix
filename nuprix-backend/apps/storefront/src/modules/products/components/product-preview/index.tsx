import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Package, Zap } from "lucide-react"
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
  const deliveryText =
    fulfillmentType === "digital"
      ? "24/7 Auto-Delivery"
      : fulfillmentType === "mixed"
        ? "Digital + Shipping"
        : fulfillmentType === "physical"
          ? "Fast Shipping"
          : "Fulfillment pending"

  return (
    <article className="group flex h-full flex-col rounded-xl border border-nuprix-line bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,.03)] transition duration-200 hover:-translate-y-0.5 hover:border-nuprix-indigo/25 hover:shadow-[0_12px_28px_rgba(15,23,42,.09)]">
      <LocalizedClientLink href={`/products/${product.handle}`} className="block">
        <div className="relative overflow-hidden rounded-lg border border-nuprix-line/80 bg-nuprix-mist">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            alt={product.title}
            size="full"
            isFeatured={isFeatured}
            className="rounded-lg bg-nuprix-mist p-0 shadow-none"
          />
        </div>
      </LocalizedClientLink>

      <div className="flex flex-1 flex-col px-1 pt-3">
        {cheapestPrice && <PreviewPrice price={cheapestPrice} />}

        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="mt-2 block"
        >
          <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-nuprix-ink transition-colors group-hover:text-nuprix-indigo">
            {product.title}
          </h3>
        </LocalizedClientLink>

        <span
          className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] font-bold ${
            fulfillmentType === "digital"
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : fulfillmentType === "mixed"
                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                : fulfillmentType === "physical"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {fulfillmentType === "physical" ? (
            <Package className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Zap className="h-3 w-3" aria-hidden="true" />
          )}
          {deliveryText}
        </span>

        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="mt-3 flex min-h-10 w-full items-center justify-center rounded-lg bg-nuprix-indigo text-sm font-bold text-white transition hover:bg-nuprix-indigo-hover"
        >
          Buy
        </LocalizedClientLink>
      </div>
    </article>
  )
}
