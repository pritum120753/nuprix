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
    <section className="content-container py-12 small:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 small:mb-10">
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-nuprix-indigo">
            Explore the collection
          </p>
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-nuprix-ink small:text-3xl">
            {collection.title}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-nuprix-muted">
            Discover products selected for practical value and dependable delivery.
          </p>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all products
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 small:grid-cols-3 small:gap-x-6 small:gap-y-14">
        {pricedProducts.map((product) => (
          <li key={product.id} className="min-w-0">
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </section>
  )
}
