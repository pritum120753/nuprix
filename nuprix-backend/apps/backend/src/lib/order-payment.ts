// The Order record has no stored payment_status: Medusa derives it from the
// order's payment collections. This applies the same idea for one question:
// "has this order been paid in full and not refunded?"

type PaymentCollectionRow = {
  status?: string | null
  amount?: unknown
  captured_amount?: unknown
  refunded_amount?: unknown
}

const EPSILON = 0.005

function toNumber(value: unknown): number {
  if (value === null || value === undefined) {
    return 0
  }
  if (typeof value === "object" && value !== null && "numeric" in value) {
    return Number((value as { numeric: unknown }).numeric)
  }
  return Number(value)
}

export const PAYMENT_COLLECTION_FIELDS = [
  "payment_collections.status",
  "payment_collections.amount",
  "payment_collections.captured_amount",
  "payment_collections.refunded_amount",
]

export function isFullyPaid(
  collections: (PaymentCollectionRow | null | undefined)[] | null | undefined,
  options?: { orderTotal?: unknown }
): boolean {
  const active = (collections ?? []).filter(
    (c): c is PaymentCollectionRow => Boolean(c) && c?.status !== "canceled"
  )
  const hasZeroOrderTotal =
    options?.orderTotal !== undefined &&
    options?.orderTotal !== null &&
    toNumber(options.orderTotal) <= EPSILON

  if (!active.length) {
    return hasZeroOrderTotal
  }

  return active.every((c) => {
    const amount = toNumber(c.amount)
    const captured = toNumber(c.captured_amount)
    const refunded = toNumber(c.refunded_amount)
    if (amount <= EPSILON) {
      return refunded <= EPSILON && amount - captured <= EPSILON
    }
    return refunded <= EPSILON && captured > 0 && amount - captured <= EPSILON
  })
}
