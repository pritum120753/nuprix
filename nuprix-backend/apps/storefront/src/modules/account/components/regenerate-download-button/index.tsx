"use client"

import { regenerateCustomerDownload } from "@lib/data/downloads"
import { useState } from "react"

export default function RegenerateDownloadButton({
  entitlementId,
}: {
  entitlementId: string
}) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

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

  return (
    <div className="flex flex-col items-start gap-2 small:items-end">
      <button
        type="button"
        onClick={regenerate}
        disabled={isPending}
        className="rounded-full border border-[#b8c9ba] px-4 py-2 text-xs font-semibold text-[#42644d] transition hover:bg-[#f4f7f2] disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Email a fresh link"}
      </button>
      {message ? (
        <p
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
