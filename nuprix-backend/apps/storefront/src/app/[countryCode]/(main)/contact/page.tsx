import { Metadata } from "next"

import { STORE_NAME } from "@lib/util/site"
import ContactForm from "@modules/contact/components/contact-form"
import { PolicyPage } from "@modules/policies/templates"

export const metadata: Metadata = {
  title: "Contact",
  description: `How to contact ${STORE_NAME}.`,
}

export default function ContactPage() {
  return (
    <PolicyPage title="Contact">
      <p>
        Questions about an order, shipping, digital downloads, or refunds? Send
        a support request below and include your order ID if applicable.
      </p>
      <ContactForm />
    </PolicyPage>
  )
}
