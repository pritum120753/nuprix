import { Metadata } from "next"

import { STORE_NAME } from "@lib/util/site"
import { PlaceholderNotice, PolicyPage } from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export const metadata: Metadata = {
  title: `About | ${STORE_NAME}`,
  description: `About ${STORE_NAME} — curated physical goods and instant digital downloads.`,
}

export default function AboutPage() {
  return (
    <PolicyPage title={`About ${STORE_NAME}`}>
      <PlaceholderNotice />
      <p>
        {STORE_NAME} brings together physical goods and digital downloads in a
        single, straightforward storefront—so you can buy once, see clear
        delivery expectations, and access your orders and downloads in one
        place.
      </p>
      <p>
        Every product listing clearly indicates whether it is delivered
        electronically, shipped to your address, or includes both.
      </p>
    </PolicyPage>
  )
}
