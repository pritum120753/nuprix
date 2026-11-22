"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"

export type PublicVendorProfile = {
  vendor: {
    id: string
    name: string
    handle: string
    description: string | null
  }
  product_ids: string[]
}

export type MyVendorProfile = {
  vendor: {
    id: string
    name: string
    handle: string
    contact_email: string
    status: "pending" | "verified" | "suspended"
    description: string | null
    commission_rate_bps: number | null
  }
  role: "owner" | "staff"
}

export type VendorProductItem = {
  id: string
  vendor_id: string
  product_id: string
  approval_status: "draft" | "pending_review" | "approved" | "rejected"
  rejection_reason: string | null
  created_at: string
}

export type VendorBalance = {
  currency_code: string
  lifetime_net: number
  pending_net: number
  available_balance: number
  reserved_payouts: number
  paid_total: number
}

export type VendorPayoutItem = {
  id: string
  amount: number
  currency_code: string
  payout_method: "bank_transfer" | "bkash" | "nagad" | "rocket" | null
  status: "requested" | "approved" | "paid" | "rejected"
  reference: string | null
  created_at: string
}

export type VendorMemberItem = {
  id: string
  user_id: string
  email: string
  role: "owner" | "staff"
  created_at: string
}

export type VendorFulfillmentOrder = {
  id: string
  vendor_id: string
  order_id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled" | "exception"
  carrier: string | null
  tracking_number: string | null
  tracking_url: string | null
  shipped_at: string | null
  delivered_at: string | null
  canceled_at: string | null
  created_at: string
  items: Array<{
    id: string
    line_item_id: string
    product_id: string | null
    quantity: number
  }>
}

export type VendorEarningsResponse = {
  balance: VendorBalance
  payouts: VendorPayoutItem[]
}

export const retrievePublicVendor = async (
  handle: string
): Promise<PublicVendorProfile | null> => {
  const next = {
    ...(await getCacheOptions("vendors")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<PublicVendorProfile>(
      `/store/vendors/${encodeURIComponent(handle)}`,
      {
        method: "GET",
        next,
      }
    )
    .catch(() => null)
}

export const retrieveMyVendor = async (): Promise<MyVendorProfile | null> => {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers)) {
    return null
  }

  return sdk.client
    .fetch<MyVendorProfile>("/store/vendors/me", {
      method: "GET",
      headers,
      cache: "no-store",
    })
    .catch(() => null)
}

export const retrieveMyVendorProducts = async (): Promise<
  VendorProductItem[]
> => {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers)) {
    return []
  }

  return sdk.client
    .fetch<{ vendor_products: VendorProductItem[] }>(
      "/store/vendors/me/products",
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    )
    .then((res) => res.vendor_products ?? [])
    .catch(() => [])
}

export const retrieveMyVendorPayouts = async (): Promise<
  VendorPayoutItem[]
> => {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers)) {
    return []
  }

  return sdk.client
    .fetch<{ payouts: VendorPayoutItem[] }>("/store/vendors/me/payouts", {
      method: "GET",
      headers,
      cache: "no-store",
    })
    .then((res) => res.payouts ?? [])
    .catch(() => [])
}

export const retrieveMyVendorMembers = async (): Promise<
  VendorMemberItem[]
> => {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers)) {
    return []
  }

  return sdk.client
    .fetch<{ members: VendorMemberItem[] }>("/store/vendors/me/members", {
      method: "GET",
      headers,
      cache: "no-store",
    })
    .then((res) => res.members ?? [])
    .catch(() => [])
}

export async function inviteVendorMember(
  _currentState: { success: boolean; error?: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string | null }> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase()
  const role = (formData.get("role") as string | null)?.trim()
  if (!email) {
    return { success: false, error: "Member email is required." }
  }
  if (role !== "owner" && role !== "staff") {
    return { success: false, error: "Select a valid team role." }
  }

  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch("/store/vendors/me/members", {
      method: "POST",
      headers,
      body: { email, role },
      cache: "no-store",
    })
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not invite member.",
    }
  }
}

export async function updateVendorMemberRole(
  memberId: string,
  role: "owner" | "staff"
): Promise<{ success: boolean; error?: string | null }> {
  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch(
      `/store/vendors/me/members/${encodeURIComponent(memberId)}`,
      {
        method: "PATCH",
        headers,
        body: { role },
        cache: "no-store",
      }
    )
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not update member role.",
    }
  }
}

export async function removeVendorMember(
  memberId: string
): Promise<{ success: boolean; error?: string | null }> {
  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch(
      `/store/vendors/me/members/${encodeURIComponent(memberId)}`,
      {
        method: "DELETE",
        headers,
        cache: "no-store",
      }
    )
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not remove member.",
    }
  }
}

export const retrieveMyVendorOrders = async (): Promise<
  VendorFulfillmentOrder[]
> => {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers)) {
    return []
  }

  return sdk.client
    .fetch<{ fulfillment_groups: VendorFulfillmentOrder[] }>(
      "/store/vendors/me/orders",
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    )
    .then((res) => res.fulfillment_groups ?? [])
    .catch(() => [])
}

export async function updateVendorFulfillment(
  orderId: string,
  input: {
    status: VendorFulfillmentOrder["status"]
    carrier?: string | null
    tracking_number?: string | null
    tracking_url?: string | null
  }
): Promise<{ success: boolean; error?: string | null }> {
  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch(
      `/store/vendors/me/orders/${encodeURIComponent(orderId)}/fulfillment`,
      {
        method: "PATCH",
        headers,
        body: input,
        cache: "no-store",
      }
    )
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not update fulfillment.",
    }
  }
}

export const retrieveMyVendorEarnings = async (
  currencyCode = "bdt"
): Promise<VendorEarningsResponse | null> => {
  const headers = await getAuthHeaders()
  if (!("authorization" in headers)) {
    return null
  }

  return sdk.client
    .fetch<VendorEarningsResponse>(
      `/store/vendors/me/earnings?currency_code=${encodeURIComponent(
        currencyCode
      )}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    )
    .catch(() => null)
}

export async function applyAsVendor(
  _currentState: { success: boolean; error?: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string | null }> {
  const name = (formData.get("name") as string | null)?.trim()
  const handle = (formData.get("handle") as string | null)?.trim()
  const contact_email = (formData.get("contact_email") as string | null)?.trim()
  const description = (formData.get("description") as string | null)?.trim()

  if (!name || !contact_email) {
    return {
      success: false,
      error: "Store name and contact email are required.",
    }
  }

  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch("/store/vendors/apply", {
      method: "POST",
      headers,
      body: {
        name,
        handle: handle || undefined,
        contact_email,
        description: description || undefined,
      },
      cache: "no-store",
    })
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not submit vendor application.",
    }
  }
}

export async function submitVendorProduct(
  _currentState: { success: boolean; error?: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string | null }> {
  const product_id = (formData.get("product_id") as string | null)?.trim()
  if (!product_id) {
    return { success: false, error: "Product ID is required." }
  }

  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch("/store/vendors/me/products", {
      method: "POST",
      headers,
      body: { product_id },
      cache: "no-store",
    })
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Could not submit product.",
    }
  }
}

export async function requestVendorPayout(
  _currentState: { success: boolean; error?: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string | null }> {
  const rawAmount = Number.parseInt(
    String(formData.get("amount") ?? "0"),
    10
  )
  const currency_code =
    (formData.get("currency_code") as string | null)?.trim().toLowerCase() ||
    "bdt"
  const payout_method = String(formData.get("payout_method") ?? "")
  const body: Record<string, string | number> = {
    amount: rawAmount,
    currency_code,
    payout_method,
  }

  if (payout_method === "bank_transfer") {
    body.bank_name = String(formData.get("bank_name") ?? "").trim()
    body.account_name = String(formData.get("account_name") ?? "").trim()
    body.account_number = String(formData.get("account_number") ?? "").trim()
  } else {
    body.mobile_number = String(formData.get("mobile_number") ?? "").trim()
  }

  if (!Number.isFinite(rawAmount) || rawAmount <= 0) {
    return { success: false, error: "Enter a valid positive payout amount." }
  }

  const headers = await getAuthHeaders()
  try {
    await sdk.client.fetch("/store/vendors/me/payouts", {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    })
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Could not request payout.",
    }
  }
}
