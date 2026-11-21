import { sdk } from "@lib/config"
import { submitAdyenPayment } from "@lib/data/adyen"
import { placeOrder } from "@lib/data/cart"
import { getAuthHeaders, getCartId, setCartId } from "@lib/data/cookies"
import { submitSslcommerzPayment } from "@lib/data/sslcommerz"
import { HttpTypes } from "@medusajs/types"
import { unstable_rethrow } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

function getFormString(form: FormData | null, key: string): string | null {
  if (!form) {
    return null
  }
  const value = form.get(key)
  return typeof value === "string" && value.length > 0 ? value : null
}

async function handleSslcommerzReturn(
  req: NextRequest,
  params: {
    status?: string | null
    cartId?: string | null
    countryCode?: string | null
    valId?: string | null
    tranId?: string | null
  }
) {
  const { origin } = req.nextUrl
  const prefix = params.countryCode ? `/${params.countryCode}` : ""
  const resolvedCartId = params.cartId || (await getCartId())

  if (!resolvedCartId) {
    return NextResponse.redirect(`${origin}${prefix}/cart?error=payment_failed`, 303)
  }

  const normalizedStatus = params.status?.toLowerCase()

  if (
    normalizedStatus === "failed" ||
    normalizedStatus === "canceled" ||
    normalizedStatus === "cancelled"
  ) {
    await setCartId(resolvedCartId)
    const mapped =
      normalizedStatus === "cancelled" ? "canceled" : normalizedStatus
    return NextResponse.redirect(
      `${origin}${prefix}/checkout?step=payment&error=payment_${mapped}`,
      303
    )
  }

  if (
    (normalizedStatus !== "success" &&
      normalizedStatus !== "valid" &&
      normalizedStatus !== "validated") ||
    !params.valId
  ) {
    await setCartId(resolvedCartId)
    return NextResponse.redirect(
      `${origin}${prefix}/checkout?step=payment&error=payment_failed`,
      303
    )
  }

  const result = await submitSslcommerzPayment({
    cartId: resolvedCartId,
    valId: params.valId,
    tranId: params.tranId ?? undefined,
  })

  if (result.ok) {
    const orderPrefix = result.countryCode ? `/${result.countryCode}` : prefix
    return NextResponse.redirect(
      `${origin}${orderPrefix}/order/${result.orderId}/confirmed`,
      303
    )
  }

  await setCartId(resolvedCartId)
  return NextResponse.redirect(
    `${origin}${prefix}/checkout?step=payment&error=order_failed`,
    303
  )
}

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const provider = searchParams.get("provider")
  if (provider !== "sslcommerz") {
    return NextResponse.redirect(`${req.nextUrl.origin}/cart?error=payment_failed`, 303)
  }

  let form: FormData | null = null
  try {
    form = await req.formData()
  } catch {
    form = null
  }

  const status = searchParams.get("status") || getFormString(form, "status")
  const cartId =
    searchParams.get("cart_id") ||
    getFormString(form, "value_b") ||
    getFormString(form, "cart_id")
  const countryCode =
    searchParams.get("country_code") ||
    getFormString(form, "value_c") ||
    getFormString(form, "country_code")
  const valId = getFormString(form, "val_id") || searchParams.get("val_id")
  const tranId = getFormString(form, "tran_id") || searchParams.get("tran_id")

  return handleSslcommerzReturn(req, {
    status,
    cartId,
    countryCode,
    valId,
    tranId,
  })
}

export async function GET(req: NextRequest) {
  const { origin, searchParams } = req.nextUrl

  if (searchParams.get("provider") === "sslcommerz") {
    return handleSslcommerzReturn(req, {
      status: searchParams.get("status"),
      cartId: searchParams.get("cart_id"),
      countryCode: searchParams.get("country_code"),
      valId: searchParams.get("val_id"),
      tranId: searchParams.get("tran_id"),
    })
  }

  const cartId = searchParams.get("cart_id")
  const countryCode = searchParams.get("country_code")
  const paymentIntent = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get(
    "payment_intent_client_secret"
  )
  const redirectStatus = searchParams.get("redirect_status")

  // Without a country code the middleware resolves the customer's region and
  // prefixes it; either way every redirect below stays on this origin.
  const prefix = countryCode ? `/${countryCode}` : ""
  const rejected = () =>
    NextResponse.redirect(`${origin}${prefix}/cart?error=payment_failed`)

  // Adyen returns the shopper here after a redirect, for example to their bank's
  // authentication page, with the result to submit to the payment session.
  const redirectResult = searchParams.get("redirectResult")

  if (cartId && redirectResult) {
    await setCartId(cartId)

    try {
      // Redirects to the order confirmation once the payment is authorized.
      await submitAdyenPayment({ details: { redirectResult } }, cartId)
    } catch (error) {
      unstable_rethrow(error)
    }

    return rejected()
  }

  if (!cartId || !paymentIntent || !paymentIntentClientSecret) {
    return rejected()
  }

  const cart = await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${cartId}`, {
      method: "GET",
      query: { fields: "payment_collection.payment_sessions.data" },
      headers: { ...(await getAuthHeaders()) },
      cache: "no-store",
    })
    .then(({ cart }) => cart)
    .catch(() => null)

  const paymentSession = cart?.payment_collection?.payment_sessions?.find(
    (session) => session.data?.id === paymentIntent
  )

  if (
    !paymentSession ||
    paymentSession.data?.client_secret !== paymentIntentClientSecret
  ) {
    return rejected()
  }

  await setCartId(cartId)

  // The customer backed out or the bank declined. Stripe puts the PaymentIntent
  // back into `requires_payment_method`, so the Payment Element can mount
  // against it again — return to the payment step and let them retry.
  if (redirectStatus === "failed") {
    const params = new URLSearchParams({ step: "payment" })

    // Forward Stripe's own return parameters so the checkout step can tell how
    // the off-site authorization ended.
    for (const key of [
      "payment_intent",
      "payment_intent_client_secret",
      "redirect_status",
    ]) {
      const value = searchParams.get(key)

      if (value) {
        params.set(key, value)
      }
    }

    return NextResponse.redirect(`${origin}${prefix}/checkout?${params}`)
  }

  try {
    await placeOrder(cartId)
  } catch (error) {
    unstable_rethrow(error)

    return NextResponse.redirect(`${origin}${prefix}/cart?error=order_failed`)
  }

  // Only reached when the cart did not convert into an order.
  return NextResponse.redirect(`${origin}${prefix}/cart?error=order_failed`)
}
