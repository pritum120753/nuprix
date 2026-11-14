import { deleteLineItem } from "@lib/data/cart"
import { notifyCartUpdated } from "@lib/util/cart-events"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
  disabled = false,
  onPendingChange,
}: {
  id: string
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  onPendingChange?: (pending: boolean) => void
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    if (disabled || isDeleting) {
      return
    }

    setIsDeleting(true)
    onPendingChange?.(true)

    try {
      await deleteLineItem(id)
      notifyCartUpdated()
    } catch (_err) {
      // Keep the existing behavior: the row stays visible and the button resets.
    } finally {
      setIsDeleting(false)
      onPendingChange?.(false)
    }
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        disabled={disabled || isDeleting}
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
