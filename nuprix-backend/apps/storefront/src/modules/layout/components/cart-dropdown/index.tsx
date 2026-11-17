"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { retrieveCart } from "@lib/data/cart"
import { CART_UPDATED_EVENT } from "@lib/util/cart-events"
import { convertToLocale } from "@lib/util/money"
import { getLineItemFulfillmentType } from "@lib/util/product"
import { HttpTypes } from "@medusajs/types"
import { buttonClasses } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const countItems = (cart?: HttpTypes.StoreCart | null) =>
  cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

const CartDropdown = ({
  cart: serverCart,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [clientCart, setClientCart] = useState<HttpTypes.StoreCart | null>(null)
  const cartState = serverCart ?? clientCart
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems = countItems(cartState)
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  useEffect(() => {
    if (serverCart) {
      return
    }

    let isInitialLoad = true
    const load = () =>
      retrieveCart()
        .then((cart) => {
          if (isInitialLoad) {
            itemRef.current = countItems(cart)
            isInitialLoad = false
          }
          setClientCart(cart)
        })
        .catch(() => {})

    load()
    window.addEventListener(CART_UPDATED_EVENT, load)
    return () => window.removeEventListener(CART_UPDATED_EVENT, load)
  }, [serverCart])

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full flex items-center">
        {/* Valid HTML: PopoverButton without nested <a> */}
        <PopoverButton
          className="h-full flex items-center text-sm font-medium text-nuprix-muted hover:text-nuprix-forest transition-colors focus:outline-none"
          data-testid="nav-cart-link"
        >
          <span>Cart ({totalItems})</span>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-nuprix-line rounded-2xl shadow-xl w-[380px] text-nuprix-ink p-5 z-50"
            data-testid="nav-cart-dropdown"
          >
            <div className="flex items-center justify-between pb-3 border-b border-nuprix-line">
              <h3 className="font-semibold text-nuprix-forest">Shopping Cart</h3>
              <span className="text-xs text-nuprix-muted">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-auto max-h-[320px] py-3 space-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[72px_1fr] gap-x-3 items-center"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-18 rounded-lg overflow-hidden border border-nuprix-line"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-nuprix-forest truncate">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h4>
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                          </div>
                          <div className="mt-1 flex items-center justify-between text-xs text-nuprix-muted">
                            <span>
                              Qty: {item.quantity} ·{" "}
                              {getLineItemFulfillmentType(item) === "digital"
                                ? "Digital"
                                : getLineItemFulfillmentType(item) === "mixed"
                                ? "Digital + Physical"
                                : "Physical"}
                            </span>
                            <DeleteButton
                              id={item.id}
                              className="text-xs text-nuprix-muted hover:text-nuprix-danger transition-colors"
                              data-testid="cart-item-remove-button"
                            >
                              Remove
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="pt-4 border-t border-nuprix-line space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-nuprix-muted">Subtotal</span>
                    <span
                      className="font-semibold text-nuprix-forest"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  {/* Clean button-styled links with no invalid button nesting */}
                  <LocalizedClientLink
                    href="/cart"
                    className={buttonClasses({ variant: "secondary", size: "small", className: "w-full" })}
                    data-testid="go-to-cart-button"
                    onClick={close}
                  >
                    View Cart
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <span className="h-10 w-10 rounded-full bg-nuprix-mist flex items-center justify-center text-nuprix-muted text-sm font-semibold mb-2">
                  0
                </span>
                <p className="text-sm text-nuprix-muted mb-4">Your bag is currently empty.</p>
                <LocalizedClientLink
                  href="/store"
                  className={buttonClasses({ variant: "primary", size: "small" })}
                  onClick={close}
                >
                  Explore Products
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
