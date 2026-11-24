"use client"

import { type CustomerDownload } from "@lib/data/downloads"
import { useState } from "react"
import { Check, Copy } from "lucide-react"

type DownloadItemActionsProps = {
  downloadId: string
  status: CustomerDownload["status"]
  title: string
  licenseKey: string | null
}

const DownloadItemActions = ({
  status,
  title,
  licenseKey,
}: DownloadItemActionsProps) => {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState<string | null>(null)

  if (status !== "available" && !licenseKey) {
    return null
  }

  const handleCopyLicenseKey = async () => {
    if (!licenseKey) {
      return
    }

    setCopyError(null)
    try {
      await navigator.clipboard.writeText(licenseKey)
      setCopied(true)
    } catch {
      setCopyError("Could not copy the license key. Please select and copy it.")
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 small:items-end">
      {licenseKey && (
        <div className="flex flex-col items-start gap-1.5 small:items-end">
          <button
            type="button"
            onClick={() => void handleCopyLicenseKey()}
            aria-label={`Copy license key for ${title}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-nuprix-line-strong bg-white px-4 py-2 text-xs font-semibold text-nuprix-forest transition hover:-translate-y-0.5 hover:border-nuprix-moss hover:bg-nuprix-paper"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy license key"}
          </button>
          {copyError && (
            <p className="text-xs text-nuprix-danger" role="alert">
              {copyError}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default DownloadItemActions
