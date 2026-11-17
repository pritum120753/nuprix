import { Metadata } from "next"

import { STORE_NAME } from "@lib/util/site"
import { PlaceholderNotice, PolicyPage } from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export const metadata: Metadata = {
  title: `FAQ | ${STORE_NAME}`,
  description: `Frequently asked questions about ordering, shipping, and digital downloads on ${STORE_NAME}.`,
}

export default function FaqPage() {
  return (
    <PolicyPage title="Frequently asked questions">
      <PlaceholderNotice />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-nuprix-forest">
          How do I receive digital products?
        </h2>
        <p>
          Once your payment is confirmed, your download links are sent to your
          order email and become available in your Account Downloads library.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-nuprix-forest">
          What happens if my cart has both digital and physical items?
        </h2>
        <p>
          You complete one checkout. Digital items are delivered electronically
          after payment confirmation, while physical items are dispatched via
          your selected shipping method.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-nuprix-forest">
          What if my download link expires or hits the limit?
        </h2>
        <p>
          Sign in to your Account Downloads page to view your remaining download
          allowance or request a fresh download link while your entitlement is
          active.
        </p>
      </section>
    </PolicyPage>
  )
}
