"use server"

import { sdk } from "@lib/config"
import { isSslcommerz } from "@lib/constants"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { getAuthHeaders, getCacheTag, removeCartId } from "./cookies"

export type SslcommerzCompletionResult =
  | { ok: true; orderId: string; countryCode?: string }
  | { ok: false; error: string }

/**
 * Attaches SSLCommerz validation identifiers to the active cart payment session
 * and completes the cart into a Medusa order without throwing a Next redirect.
 */
export async function submitSslcommerzPayment({
  cartId,
  valId,
  tranId,
}: {
  cartId: string
  valId: string
  tranId?: string
}): Promise<SslcommerzCompletionResult> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  try {
    const { cart } = await sdk.client.fetch<HttpTypes.StoreCartResponse>(
      `/store/carts/${cartId}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    )

    const sessions = cart.payment_collection?.payment_sessions
    const session =
      sessions?.find(
        (s) => isSslcommerz(s.provider_id) && s.status === "pending"
      ) ?? sessions?.find((s) => isSslcommerz(s.provider_id))

    if (!cart.payment_collection?.id || !session) {
      return { ok: false, error: "Payment session not found" }
    }

    await sdk.store.payment.updatePaymentSession(
      cart.payment_collection.id,
      session.id,
      {
        client_data: {
          val_id: valId,
          ...(tranId ? { tran_id: tranId } : {}),
        },
      },
      {},
      headers
    )

    const cartRes = await sdk.store.cart.complete(cartId, {}, headers)

    const cartCacheTag = await getCacheTag("carts")
    if (cartCacheTag) {
      revalidateTag(cartCacheTag, { expire: 0 })
    }

    if (cartRes?.type === "order") {
      const orderCacheTag = await getCacheTag("orders")
      if (orderCacheTag) {
        revalidateTag(orderCacheTag, { expire: 0 })
      }

      await removeCartId()

      const countryCode =
        cartRes.order.shipping_address?.country_code?.toLowerCase() ||
        cartRes.order.billing_address?.country_code?.toLowerCase()

      return {
        ok: true,
        orderId: cartRes.order.id,
        countryCode,
      }
    }

    return { ok: false, error: "Order could not be completed" }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Payment verification failed",
    }
  }
}
