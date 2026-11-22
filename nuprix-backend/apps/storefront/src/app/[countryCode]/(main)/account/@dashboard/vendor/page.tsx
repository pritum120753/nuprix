import { retrieveCustomer } from "@lib/data/customer"
import {
  retrieveMyVendor,
  retrieveMyVendorEarnings,
  retrieveMyVendorMembers,
  retrieveMyVendorPayouts,
  retrieveMyVendorProducts,
} from "@lib/data/vendors"
import VendorPortal from "@modules/account/components/vendor-portal/dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Seller Portal | Nuprix",
  description: "Apply to sell on Nuprix and manage your store listings and payouts.",
}

export default async function VendorAccountPage() {
  const [customer, profile] = await Promise.all([
    retrieveCustomer(),
    retrieveMyVendor(),
  ])

  const [products, earnings, payouts, members] =
    profile?.vendor.status === "verified"
      ? await Promise.all([
          retrieveMyVendorProducts(),
          retrieveMyVendorEarnings("bdt"),
          retrieveMyVendorPayouts(),
          profile.role === "owner"
            ? retrieveMyVendorMembers()
            : Promise.resolve([]),
        ])
      : [[], null, [], []]

  return (
    <VendorPortal
      profile={profile}
      products={products}
      earnings={earnings}
      payouts={payouts}
      members={members}
      customerEmail={customer?.email}
    />
  )
}
