// The Order record has no stored payment_status: Medusa derives it from the
// order's payment collections. Digital delivery uses the order total as the
// amount that must be captured, so an extra empty collection cannot undo a
// successful payment.

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

export type PaymentState = "paid" | "unpaid" | "refunded"

export function getPaymentState(
  collections: (PaymentCollectionRow | null | undefined)[] | null | undefined,
  orderTotal?: unknown
): PaymentState {
  const active = (collections ?? []).filter(
    (collection): collection is PaymentCollectionRow =>
      Boolean(collection) && collection?.status !== "canceled"
  )

  if (active.some((collection) => toNumber(collection.refunded_amount) > EPSILON)) {
    return "refunded"
  }

  const total = orderTotal === undefined ? undefined : toNumber(orderTotal)
  if (total !== undefined && total <= EPSILON) {
    return "paid"
  }
  if (!active.length) {
    return "unpaid"
  }

  if (total !== undefined) {
    const captured = active.reduce(
      (sum, collection) => sum + toNumber(collection.captured_amount),
      0
    )
    return captured > 0 && captured + EPSILON >= total ? "paid" : "unpaid"
  }

  // Callers without an order total retain the conservative legacy rule.
  return active.every((collection) => {
    const amount = toNumber(collection.amount)
    const captured = toNumber(collection.captured_amount)
    return captured > 0 && amount - captured <= EPSILON
  })
    ? "paid"
    : "unpaid"
}

export function isFullyPaid(
  collections: (PaymentCollectionRow | null | undefined)[] | null | undefined,
  orderTotal?: unknown
): boolean {
  return getPaymentState(collections, orderTotal) === "paid"
}
