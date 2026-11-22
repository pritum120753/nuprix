export default function VendorDashboardLoading() {
  return (
    <div className="animate-pulse space-y-6" data-testid="vendor-dashboard-loading">
      <div className="flex items-end justify-between border-b border-nuprix-line pb-5">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-nuprix-sage" />
          <div className="h-8 w-52 rounded bg-nuprix-sage" />
        </div>
        <div className="h-7 w-20 rounded-full bg-nuprix-mist" />
      </div>

      <div className="grid grid-cols-2 gap-3 small:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-24 rounded-lg border border-nuprix-line bg-nuprix-paper p-4">
            <div className="h-3 w-16 rounded bg-nuprix-mist" />
            <div className="mt-4 h-6 w-24 rounded bg-nuprix-sage" />
          </div>
        ))}
      </div>

      <div className="h-11 rounded bg-nuprix-mist" />
      <div className="grid gap-4 small:grid-cols-2">
        <div className="h-36 rounded-lg border border-nuprix-line bg-nuprix-paper" />
        <div className="h-36 rounded-lg border border-nuprix-line bg-nuprix-paper" />
      </div>
    </div>
  )
}
