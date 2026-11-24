import type { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DownloadItemActions from "@modules/account/components/download-item-actions"
import RegenerateDownloadButton from "@modules/account/components/regenerate-download-button"
import { retrieveCustomer } from "@lib/data/customer"
import { listCustomerDownloads } from "@lib/data/downloads"
import { Download, KeyRound, PackageOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "My Downloads | Nuprix",
  description: "View your purchased digital products and download access.",
}

const statusLabels = {
  available: "Available",
  awaiting_payment: "Awaiting payment",
  refunded: "Refunded",
  order_canceled: "Order canceled",
  unavailable: "Unavailable",
  expired: "Expired",
  revoked: "Access revoked",
  limit_reached: "Limit reached",
} as const

export default async function DownloadsPage() {
  const customer = await retrieveCustomer({ cache: "no-store" })

  if (!customer) {
    return null
  }

  const downloads = await listCustomerDownloads()

  return (
    <section className="w-full" data-testid="customer-downloads-page">
      <div className="mb-6 rounded-[16px] border border-nuprix-line bg-nuprix-mist/50 px-5 py-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-nuprix-violet">
          License key vault
        </p>
        <h1 className="text-3xl font-bold tracking-[-0.04em] text-nuprix-ink small:text-4xl">
          My Downloads
        </h1>
        <p className="mt-2 text-sm leading-6 text-nuprix-muted">
          Find your purchased files and check the status of your download access.
          Your secure download link is also sent to your order email.
        </p>
      </div>

      {downloads.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-nuprix-line-strong bg-nuprix-mist/30 px-6 py-12 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-violet-100 text-nuprix-violet">
            <PackageOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-[#24372a]">
            Your library is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-nuprix-muted">
            Digital products you purchase with this account will appear here.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-5 inline-flex rounded-lg bg-nuprix-indigo px-5 py-3 text-sm font-semibold text-white transition hover:bg-nuprix-indigo-hover"
          >
            Explore digital products
          </LocalizedClientLink>
        </div>
      ) : (
        <ul className="space-y-4">
          {downloads.map((download) => (
            <li
              key={download.id}
              className="flex flex-col gap-5 rounded-[16px] border border-nuprix-line bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,.03)] small:flex-row small:items-center small:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-violet-100 text-nuprix-violet">
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-medium text-nuprix-forest">{download.title}</h2>
                <p className="mt-1 truncate text-sm text-nuprix-muted">
                  {download.file_name}
                </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-nuprix-muted">
                  {download.download_count} of {download.max_downloads} downloads used
                  {download.expires_at
                    ? ` · Access until ${new Date(download.expires_at).toLocaleDateString()}`
                    : " · No expiry date"}
                </p>
                <p className="mt-1 text-xs text-nuprix-muted">
                  Order: {download.order_id}
                </p>
                {download.license_key && (
                  <div className="mt-4 rounded-[12px] border border-violet-200 bg-violet-50 p-3">
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700">
                      <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                      License key
                    </p>
                    <code className="mt-1 block break-all rounded-lg border border-violet-100 bg-white px-3 py-2 font-mono text-xs font-bold tracking-[0.06em] text-violet-900">
                      {download.license_key}
                    </code>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start gap-2 small:items-end">
                <span
                  className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    download.status === "available"
                      ? "bg-[#eaf3eb] text-[#42644d]"
                      : "bg-[#f2f2ef] text-[#777c75]"
                  }`}
                >
                  {statusLabels[download.status]}
                </span>
                <DownloadItemActions
                  downloadId={download.id}
                  status={download.status}
                  title={download.title}
                  licenseKey={download.license_key}
                />
                {download.status === "available" ? (
                  <RegenerateDownloadButton entitlementId={download.id} />
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
