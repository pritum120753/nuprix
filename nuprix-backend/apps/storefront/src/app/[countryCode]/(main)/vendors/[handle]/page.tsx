import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { retrievePublicVendor } from "@lib/data/vendors"
import { Badge } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const data = await retrievePublicVendor(handle)
  if (!data) {
    return { title: "Vendor not found | Nuprix" }
  }
  return {
    title: `${data.vendor.name} | Nuprix`,
    description:
      data.vendor.description ||
      `Browse products from ${data.vendor.name} on Nuprix.`,
  }
}

export default async function VendorStorePage({
  params,
}: {
  params: Promise<{ countryCode: string; handle: string }>
}) {
  const { countryCode, handle } = await params
  const [data, region] = await Promise.all([
    retrievePublicVendor(handle),
    getRegion(countryCode),
  ])

  if (!data || !region) {
    return notFound()
  }

  const products =
    data.product_ids.length > 0
      ? await listProducts({
          countryCode,
          queryParams: { id: data.product_ids, limit: 100 },
        })
          .then((res) => res.response.products)
          .catch(() => [])
      : []

  return (
    <div className="bg-nuprix-ivory py-12 small:py-16 min-h-[calc(100vh-64px)]">
      <div className="content-container space-y-10">
        <div className="surface-card p-6 small:p-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl small:text-3xl font-display font-medium text-nuprix-forest">
              {data.vendor.name}
            </h1>
            <Badge color="green">Verified Seller</Badge>
          </div>
          {data.vendor.description && (
            <p className="text-sm leading-6 text-nuprix-muted max-w-2xl">
              {data.vendor.description}
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="surface-card p-8 text-center space-y-3">
            <p className="text-sm text-nuprix-muted">
              This store has no published listings yet.
            </p>
            <LocalizedClientLink
              href="/store"
              className="inline-block text-sm font-semibold text-nuprix-pine hover:text-nuprix-forest underline underline-offset-4"
            >
              Browse the full catalog
            </LocalizedClientLink>
          </div>
        ) : (
          <ul
            className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
            data-testid="vendor-products-grid"
          >
            {products.map((product) => (
              <li key={product.id}>
                <ProductPreview product={product} region={region} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
