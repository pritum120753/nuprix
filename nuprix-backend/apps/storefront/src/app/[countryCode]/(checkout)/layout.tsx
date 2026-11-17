import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-nuprix-ivory relative small:min-h-screen">
      <div className="h-16 bg-white/80 backdrop-blur-md border-b border-nuprix-line">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-nuprix-muted hover:text-nuprix-forest transition-colors flex items-center gap-x-2 flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block text-xs font-semibold uppercase tracking-wider">
              Back to cart
            </span>
            <span className="mt-px block small:hidden text-xs font-semibold uppercase tracking-wider">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-nuprix-forest"
            data-testid="store-link"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-nuprix-forest text-xs font-bold text-nuprix-ivory">
              N
            </span>
            <span className="font-display tracking-tight text-xl lowercase">nuprix</span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <main
        id="main-content"
        tabIndex={-1}
        className="relative py-8"
        data-testid="checkout-container"
      >
        {children}
      </main>
      <div className="py-8 w-full flex flex-col items-center justify-center border-t border-nuprix-line text-xs text-nuprix-muted gap-1">
        <p>© {new Date().getFullYear()} Nuprix. Secure Checkout</p>
      </div>
    </div>
  )
}
