// The Order record has no stored payment_status: Medusa derives it from the
// order's payment collections. These helpers answer one question: "can the
// customer be given the files for this order?"

type PaymentCollectionRow = {
  status?: string | null
  amount?: unknown
  captured_amount?: unknown
  refunded_amount?: unknown
}

export type PaymentState = "paid" | "unpaid" | "refunded"

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

// - refunded: any money has been refunded (access is withdrawn)
// - paid: every active collection is fully captured
// - unpaid: anything else, including no payment collection at all
export function getPaymentState(
  collections: (PaymentCollectionRow | null | undefined)[] | null | undefined
): PaymentState {
  const active = (collections ?? []).filter(
    (c): c is PaymentCollectionRow => Boolean(c) && c?.status !== "canceled"
  )
  if (!active.length) {
    return "unpaid"
  }

  if (active.some((c) => toNumber(c.refunded_amount) > EPSILON)) {
    return "refunded"
  }

  const allCaptured = active.every((c) => {
    const captured = toNumber(c.captured_amount)
    return captured > 0 && toNumber(c.amount) - captured <= EPSILON
  })
  return allCaptured ? "paid" : "unpaid"
}

export function isFullyPaid(
  collections: (PaymentCollectionRow | null | undefined)[] | null | undefined
): boolean {
  return getPaymentState(collections) === "paid"
}
