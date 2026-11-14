// Public URL of a download link. Built here so every place that emails or
// returns a link uses the same base.
export function buildDownloadUrl(token: string): string {
  const base = (process.env.DOWNLOAD_BASE_URL || "http://localhost:9000").replace(
    /\/$/,
    ""
  )
  return `${base}/downloads/${token}`
}
