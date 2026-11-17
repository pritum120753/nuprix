import { Metadata } from "next"

import { STORE_NAME } from "@lib/util/site"
import { PlaceholderNotice, PolicyPage } from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export const metadata: Metadata = {
  title: `Digital License | ${STORE_NAME}`,
  description: `Standard digital license terms for downloadable products on ${STORE_NAME}.`,
}

export default function DigitalLicensePage() {
  return (
    <PolicyPage title="Digital license terms">
      <PlaceholderNotice />
      <p>
        Unless a product listing or attached file record specifies different
        terms, digital files purchased on {STORE_NAME} are licensed for your
        own use and may not be redistributed, resold, or shared publicly.
      </p>
      <p>
        Product-specific license notes, download limits, and link expiration
        windows are shown on each digital product page and in your order
        confirmation.
      </p>
    </PolicyPage>
  )
}
