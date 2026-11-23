"use client"

import {
  regenerateCustomerDownload,
  type CustomerDownload,
} from "@lib/data/downloads"
import { useState } from "react"
import { Check, Copy, Download, RotateCcw } from "lucide-react"

type DownloadItemActionsProps = {
  downloadId: string
  status: CustomerDownload["status"]
  title: string
  licenseKey: string | null
}

const DownloadItemActions = ({
  downloadId,
  status,
  title,
  licenseKey,
}: DownloadItemActionsProps) => {
  const [pending, setPending] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState<string | null>(null)

  if (status !== "available" && !licenseKey) {
    return null
  }

  const handleRegenerate = async () => {
    setPending(true)
    setError(null)
    const result = await regenerateCustomerDownload(downloadId)
    setPending(false)

    if (result.error) {
      setError(result.error)
      return
    }
    if (result.download_url) {
      setDownloadUrl(result.download_url)
    }
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
      {status === "available" && (
        <>
          {downloadUrl ? (
            <div className="flex flex-col gap-1.5 small:items-end">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-action min-h-[44px] px-5 py-2 text-xs"
                data-testid={`download-now-link-${downloadId}`}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download {title}
              </a>
              <p className="text-xs text-nuprix-muted">
                New link generated. Any previous link for this file is now invalid.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void handleRegenerate()}
              disabled={pending}
              aria-label={`Request new download link for ${title}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-nuprix-line-strong bg-white px-4 py-2 text-xs font-semibold text-nuprix-forest transition hover:border-nuprix-moss disabled:opacity-50"
              data-testid={`regenerate-download-button-${downloadId}`}
            >
              <RotateCcw
                className={`h-4 w-4 ${pending ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              {pending ? "Generating link..." : "Request new link"}
            </button>
          )}
          {error && (
            <p className="text-xs text-nuprix-danger" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default DownloadItemActions
