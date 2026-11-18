"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type SupportFormState = {
  success: boolean
  ticketId?: string
  error?: string | null
} | null

export async function submitSupportTicket(
  _currentState: SupportFormState,
  formData: FormData
): Promise<SupportFormState> {
  const email = (formData.get("email") as string | null)?.trim()
  const name = (formData.get("name") as string | null)?.trim()
  const orderId = (formData.get("order_id") as string | null)?.trim()
  const category = (formData.get("category") as string | null)?.trim()
  const subject = (formData.get("subject") as string | null)?.trim()
  const message = (formData.get("message") as string | null)?.trim()

  if (!email) {
    return { success: false, error: "Please enter your email address." }
  }
  if (!subject || subject.length < 3) {
    return {
      success: false,
      error: "Subject must be at least 3 characters long.",
    }
  }
  if (!message || message.length < 10) {
    return {
      success: false,
      error: "Message must be at least 10 characters long.",
    }
  }

  const headers = await getAuthHeaders()

  try {
    const res = await sdk.client.fetch<{
      ticket: { id: string; status: string }
    }>("/store/support-tickets", {
      method: "POST",
      headers,
      body: {
        email,
        name: name || undefined,
        order_id: orderId || undefined,
        category: category || "general",
        subject,
        message,
      },
      cache: "no-store",
    })
    return { success: true, ticketId: res.ticket.id, error: null }
  } catch {
    return {
      success: false,
      error: "Could not submit your request right now. Please try again.",
    }
  }
}
