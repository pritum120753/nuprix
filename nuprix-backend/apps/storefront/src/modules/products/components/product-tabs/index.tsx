"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import {
  getProductFulfillmentType,
  type ProductClassification,
  type ProductFulfillmentType,
} from "@lib/util/product"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
  classification?: ProductClassification | null
}

const ProductTabs = ({ product, classification }: ProductTabsProps) => {
  const productType = getProductFulfillmentType(product, classification)
  const isDigital = productType === "digital"
  const isMixed = productType === "mixed"

  const tabs = [
    {
      label: "Specifications & Details",
      component: (
        <ProductInfoTab
          product={product}
          productType={productType}
          classification={classification}
        />
      ),
    },
    ...(isDigital || isMixed
      ? [
          {
            label: "Digital Delivery & Access",
            component: <DigitalDeliveryTab classification={classification} />,
          },
        ]
      : []),
    ...(!isDigital
      ? [
          {
            label: "Shipping & Returns",
            component: <ShippingInfoTab />,
          },
        ]
      : []),
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({
  product,
  productType,
  classification,
}: {
  product: HttpTypes.StoreProduct
  productType: ProductFulfillmentType
  classification?: ProductClassification | null
}) => {
  const primaryFile = classification?.digital_files?.[0]
  const licenseText =
    primaryFile?.license_note || "Standard digital license (see terms)"

  if (productType === "digital" || productType === "mixed") {
    return (
      <div className="text-xs leading-5 text-nuprix-muted py-4 space-y-3">
        <p>
          {productType === "mixed"
            ? "This product includes both digital download files (delivered electronically upon payment capture) and physical items shipped to your address."
            : "This is a digital product delivered electronically to your account and verified order email address upon payment confirmation."}
        </p>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-nuprix-line">
          <div>
            <span className="font-semibold text-nuprix-forest block">Format</span>
            <span>
              {primaryFile
                ? `${primaryFile.file_name}${
                    classification && classification.digital_files.length > 1
                      ? ` (+${classification.digital_files.length - 1} more)`
                      : ""
                  }`
                : "Digital File Download"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-nuprix-forest block">License</span>
            <span>{licenseText}</span>
          </div>
        </div>
      </div>
    )
  }

  const hasPhysicalSpecs = Boolean(product.material || product.origin_country || product.weight || product.length)

  return (
    <div className="text-xs leading-5 text-nuprix-muted py-4">
      {hasPhysicalSpecs ? (
        <div className="grid grid-cols-2 gap-4">
          {product.material && (
            <div>
              <span className="font-semibold text-nuprix-forest block">Material</span>
              <p>{product.material}</p>
            </div>
          )}
          {product.origin_country && (
            <div>
              <span className="font-semibold text-nuprix-forest block">Country of origin</span>
              <p>{product.origin_country}</p>
            </div>
          )}
          {product.weight && (
            <div>
              <span className="font-semibold text-nuprix-forest block">Weight</span>
              <p>{product.weight} g</p>
            </div>
          )}
          {product.length && product.width && product.height && (
            <div>
              <span className="font-semibold text-nuprix-forest block">Dimensions</span>
              <p>{product.length}L x {product.width}W x {product.height}H</p>
            </div>
          )}
        </div>
      ) : (
        <p>Physical merchandise fulfilled according to region shipping standards.</p>
      )}
    </div>
  )
}

const DigitalDeliveryTab = ({
  classification,
}: {
  classification?: ProductClassification | null
}) => {
  const primaryFile = classification?.digital_files?.[0]
  const allowanceText = primaryFile
    ? `Up to ${primaryFile.max_downloads} downloads${
        primaryFile.expires_after_days
          ? ` within ${primaryFile.expires_after_days} days`
          : ""
      } via short-lived signed links.`
    : "Download tokens are securely rate-limited and provide multiple access attempts for your files."

  return (
    <div className="text-xs leading-5 text-nuprix-muted py-4 space-y-3">
      <div className="flex items-start gap-x-2.5">
        <FastDelivery />
        <div>
          <span className="font-semibold text-nuprix-forest block">Instant Electronic Access</span>
          <p>
            Immediately following completed payment capture, a unique verified download link is generated and sent to your email and accessible in your Account Downloads dashboard.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-2.5">
        <Refresh />
        <div>
          <span className="font-semibold text-nuprix-forest block">Standard Download Allowances</span>
          <p>{allowanceText}</p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-xs leading-5 text-nuprix-muted py-4 space-y-3">
      <div className="flex items-start gap-x-2.5">
        <FastDelivery />
        <div>
          <span className="font-semibold text-nuprix-forest block">Standard & Expedited Delivery</span>
          <p>
            Dispatched via regional fulfillment carriers. Estimated transit times vary by destination.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-2.5">
        <Back />
        <div>
          <span className="font-semibold text-nuprix-forest block">Return Policy</span>
          <p>
            Eligible physical merchandise may be returned according to our return policy terms.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
