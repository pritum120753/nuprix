import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts?.length) {
    return (
      <section className="content-container py-12" role="status">
        <p className="text-sm text-nuprix-muted">
          No featured products are available in {collection.title} right now.
        </p>
        <div className="mt-3">
          <InteractiveLink href="/store">Browse all products</InteractiveLink>
        </div>
      </section>
    )
  }

  return (
    <section className="content-container py-8 small:py-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-nuprix-indigo">
            Trending now
          </p>
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-nuprix-ink small:text-3xl">
            Bestsellers
          </h2>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all products
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {pricedProducts.map((product) => (
          <li key={product.id} className="min-w-0">
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </section>
  )
}
