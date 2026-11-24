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
        className="min-h-[44px] rounded-lg border border-nuprix-line-strong bg-white px-4 py-2 text-xs font-bold text-nuprix-indigo transition hover:-translate-y-0.5 hover:border-nuprix-indigo/40 disabled:cursor-wait disabled:opacity-60"
      >
        {buttonLabel}
      </button>
      {message ? (
        <p
          ref={messageRef}
          tabIndex={-1}
          className={`text-xs ${success ? "text-emerald-700" : "text-red-700"}`}
          role={success ? "status" : "alert"}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
