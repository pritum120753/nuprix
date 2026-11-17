"use client"

import { Button, Heading } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCartDeliverySplit } from "@lib/util/product"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const { isMixed, isDigitalOnly } = getCartDeliverySplit(cart.items)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      {isMixed && (
        <div
          className="rounded-lg border border-nuprix-line bg-nuprix-ivory px-3 py-2.5 text-xs leading-5 text-nuprix-muted"
          data-testid="mixed-cart-notice"
        >
          <span className="font-semibold text-nuprix-forest">Mixed cart:</span>{" "}
          Digital items will be available to download after payment; physical
          items will ship to your address.
        </div>
      )}
      {isDigitalOnly && (
        <div
          className="rounded-lg border border-nuprix-line bg-nuprix-ivory px-3 py-2.5 text-xs leading-5 text-nuprix-muted"
          data-testid="digital-cart-notice"
        >
          <span className="font-semibold text-nuprix-forest">
            Digital delivery:
          </span>{" "}
          Download links will be delivered to your email and account after
          payment.
        </div>
      )}
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10">Go to checkout</Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
