import { Metadata } from "next"

import { STORE_NAME } from "@lib/util/site"
import { PlaceholderNotice, PolicyPage } from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export const metadata: Metadata = {
  title: `Refund Policy | ${STORE_NAME}`,
  description: `Refund policy for physical and digital purchases on ${STORE_NAME}.`,
}

export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund policy">
      <PlaceholderNotice />
      <p>
        Refund eligibility depends on whether an item is physical merchandise or
        a digital download. Please review your order details and reach out
        through our Contact page if you need assistance with a refund request.
      </p>
      <p>
        When a refund is issued for a digital product, associated download
        entitlements are revoked automatically.
      </p>
    </PolicyPage>
  )
}
