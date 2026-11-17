import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 py-8 small:py-16 bg-nuprix-ivory min-h-[calc(100vh-64px)]" data-testid="account-page">
      <div className="content-container max-w-6xl mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 small:grid-cols-[260px_1fr] gap-8">
          <aside className="surface-card p-6 h-fit">
            {customer && <AccountNav customer={customer} />}
          </aside>
          <main className="surface-card p-6 small:p-8">
            {children}
          </main>
        </div>

        <div className="surface-card p-6 flex flex-col small:flex-row items-start small:items-center justify-between gap-4 text-sm text-nuprix-muted">
          <div>
            <h4 className="font-semibold text-nuprix-forest">Need assistance with your orders or digital library?</h4>
            <p className="mt-0.5 text-xs">Reach out to our customer care team or read our fulfillment guidelines.</p>
          </div>
          <LocalizedClientLink
            href="/contact"
            className="text-xs font-semibold text-nuprix-pine hover:text-nuprix-forest underline underline-offset-4"
          >
            Contact Customer Care →
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
