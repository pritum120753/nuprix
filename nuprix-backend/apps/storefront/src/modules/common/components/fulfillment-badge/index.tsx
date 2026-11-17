import { Badge } from "@modules/common/components/ui"
import type { ProductFulfillmentType } from "@lib/util/product"

type FulfillmentBadgeProps = {
  type: ProductFulfillmentType
  context?: "cart" | "order"
}

const LABELS: Record<
  "cart" | "order",
  Record<ProductFulfillmentType, string>
> = {
  cart: {
    digital: "Digital · Download after payment",
    mixed: "Digital + Physical · Download & shipping",
    physical: "Physical · Ships to address",
  },
  order: {
    digital: "Digital · Download in account once paid",
    mixed: "Digital + Physical · Download & shipment",
    physical: "Physical · Standard shipping",
  },
}

const COLORS: Record<ProductFulfillmentType, "blue" | "green"> = {
  digital: "blue",
  mixed: "blue",
  physical: "green",
}

const FulfillmentBadge = ({
  type,
  context = "cart",
}: FulfillmentBadgeProps) => {
  return (
    <div className="mt-1.5">
      <Badge color={COLORS[type]}>{LABELS[context][type]}</Badge>
    </div>
  )
}

export default FulfillmentBadge
