import type { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DownloadItemActions from "@modules/account/components/download-item-actions"
import { retrieveCustomer } from "@lib/data/customer"
import { listCustomerDownloads } from "@lib/data/downloads"

export const metadata: Metadata = {
  title: "My Downloads | Nuprix",
  description: "View your purchased digital products and download access.",
}

const statusLabels = {
  available: "Available",
  awaiting_payment: "Awaiting payment",
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
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#71917a]">
          Your digital library
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#172b20]">
          My Downloads
        </h1>
        <p className="mt-2 text-sm leading-6 text-nuprix-muted">
          Find your purchased files and check the status of your download access.
          Your secure download link is also sent to your order email.
        </p>
      </div>

      {downloads.length === 0 ? (
        <div className="rounded-2xl border border-[#e5eae3] bg-[#f7f9f5] px-6 py-10 text-center">
          <h2 className="text-lg font-semibold text-[#24372a]">
            Your library is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-nuprix-muted">
            Digital products you purchase with this account will appear here.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-5 inline-flex rounded-full bg-[#172b20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#355b40]"
          >
            Explore digital products
          </LocalizedClientLink>
        </div>
      ) : (
        <ul className="space-y-3">
          {downloads.map((download) => (
            <li
              key={download.id}
              className="flex flex-col gap-4 rounded-2xl border border-[#e5eae3] bg-white p-5 small:flex-row small:items-center small:justify-between"
            >
              <div className="min-w-0">
                <h2 className="font-semibold text-[#24372a]">{download.title}</h2>
                <p className="mt-1 truncate text-sm text-nuprix-muted">
                  {download.file_name}
                </p>
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
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-[#42644d]">
                      License key
                    </p>
                    <code className="mt-1 block break-all rounded-lg bg-[#f7f9f5] px-3 py-2 text-xs text-[#24372a]">
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
