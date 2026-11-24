import { HttpTypes } from "@medusajs/types"
import { Heading, Text, Badge } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  getProductFulfillmentType,
  type ProductClassification,
} from "@lib/util/product"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  classification?: ProductClassification | null
}

const ProductInfo = ({ product, classification }: ProductInfoProps) => {
  const productType = getProductFulfillmentType(product, classification)

  return (
    <div id="product-info" className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between gap-2">
        {product.collection ? (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-nuprix-indigo hover:text-nuprix-indigo-hover transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-nuprix-muted">
            Catalog
          </span>
        )}

        {productType === "digital" ? (
          <Badge color="blue">Instant Digital + License Key</Badge>
        ) : productType === "mixed" ? (
          <Badge color="blue">Digital + Physical</Badge>
        ) : (
          <Badge color="green">Verified Dropship / Physical</Badge>
        )}
      </div>

      <Heading
        level="h1"
        className="text-3xl small:text-[42px] font-sans font-bold leading-[1.04] text-nuprix-ink tracking-[-0.04em]"
        data-testid="product-title"
      >
        {product.title}
      </Heading>

      {product.description && (
        <Text
          className="text-sm leading-6 text-nuprix-muted whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      )}
    </div>
  )
}

export default ProductInfo
