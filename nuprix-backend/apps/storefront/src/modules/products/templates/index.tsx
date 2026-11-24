import React, { Suspense } from "react"
import VariantImageGallery from "@modules/products/components/image-gallery/variant-image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import type { ProductClassification } from "@lib/util/product"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  classification: ProductClassification | null
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  classification,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-nuprix-ivory py-6 small:py-10">
      <div
        className="content-container grid grid-cols-1 small:grid-cols-12 gap-8 lg:gap-12 items-start"
        data-testid="product-container"
      >
        {/* Left Column: Visual Gallery (7 cols on desktop) */}
        <div className="small:col-span-7 w-full">
          <div className="overflow-hidden rounded-[20px] border border-nuprix-line bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,.05)] small:p-4">
            <VariantImageGallery product={product} />
          </div>
        </div>

        {/* Right Column: Buy Box & Product Info & Tabs (5 cols on desktop, sticky) */}
        <div className="small:col-span-5 flex flex-col gap-y-6 small:sticky small:top-24">
          <div className="rounded-[20px] border border-nuprix-line bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.05)] small:p-7 flex flex-col gap-y-5">
            <ProductInfo product={product} classification={classification} />
            <div className="border-t border-nuprix-line pt-6">
              <ProductActions product={product} region={region} />
            </div>
          </div>

          <div className="rounded-[20px] border border-nuprix-line bg-white p-5 small:p-6">
            <ProductTabs product={product} classification={classification} />
          </div>
        </div>
      </div>

      <div
        className="content-container mt-16 small:mt-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
