"use client"

import { useState, useTransition } from "react"
import { requestDownloadLink } from "@lib/data/downloads"

type Props = {
  downloadId: string
  title: string
}

export default function DownloadLinkButton({ downloadId, title }: Props) {
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const getLink = () => {
    setError(null)
    startTransition(async () => {
      const result = await requestDownloadLink(downloadId)
      if ("error" in result) {
        setUrl(null)
        setError(result.error)
      } else {
        setUrl(result.url)
      }
    })
  }

  return (
    <div className="flex flex-col gap-2 small:items-end" data-testid="download-link">
      {url ? (
        <>
          <a
            href={url}
            rel="noreferrer"
            className="inline-flex rounded-full bg-[#172b20] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#355b40]"
            data-testid="download-now-link"
          >
            Download now
          </a>
          <p className="max-w-[16rem] text-xs text-[#788279] small:text-right">
            This replaces the link in your order email.
          </p>
        </>
      ) : (
        <button
          type="button"
          onClick={getLink}
          disabled={pending}
          aria-label={`Get a new download link for ${title}`}
          className="inline-flex rounded-full border border-[#172b20] px-4 py-2 text-sm font-semibold text-[#172b20] transition hover:bg-[#172b20] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          data-testid="get-link-button"
        >
          {pending ? "Preparing link…" : "Get new link"}
        </button>
      )}
      <p role="status" aria-live="polite" className="text-xs text-[#a14b3b]">
        {error}
      </p>
    </div>
  )
}
