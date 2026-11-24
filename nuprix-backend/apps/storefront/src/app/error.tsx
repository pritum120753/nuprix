"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main-content"
      className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-5 px-6 text-center"
    >
      <div className="flex max-w-md flex-col gap-3">
        <p className="text-small-regular text-ui-fg-muted">Unexpected error</p>
        <h1 className="text-2xl-semi text-ui-fg-base">
          We could not complete that request
        </h1>
        <p className="text-small-regular text-ui-fg-subtle">
          Please try again or return to the storefront.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-ui-border-base px-4 py-2 text-ui-fg-base"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md bg-ui-bg-interactive px-4 py-2 text-ui-fg-on-inverted"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}
