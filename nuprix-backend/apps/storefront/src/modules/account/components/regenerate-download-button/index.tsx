"use client"

import { regenerateCustomerDownload } from "@lib/data/downloads"
import { useEffect, useRef, useState } from "react"

export default function RegenerateDownloadButton({
  entitlementId,
}: {
  entitlementId: string
}) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const messageRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (message) {
      messageRef.current?.focus()
    }
  }, [message])

  const regenerate = async () => {
    if (isPending) {
      return
    }
    setMessage("")
    setIsPending(true)
    try {
      const result = await regenerateCustomerDownload(entitlementId)
      setSuccess(result.success)
      setMessage(result.message)
    } finally {
      setIsPending(false)
    }
  }

  const buttonLabel = isPending ? "Sending fresh link" : "Email a fresh link"

  return (
    <div className="flex flex-col items-start gap-2 small:items-end">
      <button
        type="button"
        onClick={regenerate}
        disabled={isPending}
        aria-label={buttonLabel}
        className="rounded-full border border-[#b8c9ba] px-4 py-2 text-xs font-semibold text-[#42644d] transition hover:bg-[#f4f7f2] disabled:cursor-wait disabled:opacity-60"
      >
        {buttonLabel}
      </button>
      {message ? (
        <p
          ref={messageRef}
          tabIndex={-1}
          className={`text-xs ${success ? "text-[#42644d]" : "text-red-700"}`}
          role={success ? "status" : "alert"}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
