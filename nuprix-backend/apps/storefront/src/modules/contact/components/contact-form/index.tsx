"use client"

import { submitSupportTicket } from "@lib/data/support"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useActionState } from "react"

const ContactForm = () => {
  const [state, formAction] = useActionState(submitSupportTicket, null)

  if (state?.success) {
    return (
      <div
        className="surface-card p-6 space-y-3"
        data-testid="contact-form-success"
      >
        <h2 className="text-lg font-semibold text-nuprix-forest">
          Support request received
        </h2>
        <p className="text-sm text-nuprix-muted">
          Thank you for reaching out. Your reference ID is{" "}
          <span className="font-mono font-semibold text-nuprix-ink">
            {state.ticketId}
          </span>
          . Our team will reply to your email address.
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="surface-card p-6 space-y-4"
      data-testid="contact-form"
    >
      <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="support-name"
            className="block text-xs font-semibold text-nuprix-forest"
          >
            Name (optional)
          </label>
          <input
            id="support-name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="support-email"
            className="block text-xs font-semibold text-nuprix-forest"
          >
            Email *
          </label>
          <input
            id="support-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="support-category"
            className="block text-xs font-semibold text-nuprix-forest"
          >
            Topic
          </label>
          <select
            id="support-category"
            name="category"
            defaultValue="general"
            className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
          >
            <option value="general">General question</option>
            <option value="order">Order & shipping</option>
            <option value="digital_download">Digital download issue</option>
            <option value="refund">Refund request</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="support-order-id"
            className="block text-xs font-semibold text-nuprix-forest"
          >
            Order ID (optional)
          </label>
          <input
            id="support-order-id"
            name="order_id"
            type="text"
            placeholder="e.g. order_01..."
            className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="support-subject"
          className="block text-xs font-semibold text-nuprix-forest"
        >
          Subject *
        </label>
        <input
          id="support-subject"
          name="subject"
          type="text"
          required
          minLength={3}
          className="w-full min-h-[44px] rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="support-message"
          className="block text-xs font-semibold text-nuprix-forest"
        >
          Message *
        </label>
        <textarea
          id="support-message"
          name="message"
          rows={5}
          required
          minLength={10}
          className="w-full rounded-md border border-nuprix-line bg-white px-3 py-2 text-sm text-nuprix-ink"
        />
      </div>

      <ErrorMessage
        error={state?.error}
        data-testid="contact-form-error-message"
      />

      <SubmitButton
        className="w-full small:w-auto min-h-[44px] px-6"
        data-testid="contact-form-submit"
      >
        Send message
      </SubmitButton>
    </form>
  )
}

export default ContactForm
