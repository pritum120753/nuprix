import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Code2,
  Download,
  Gamepad2,
  Layers3,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react"

const categories = [
  { name: "SaaS & Scripts", detail: "Apps and automation", icon: Code2, href: "/store" },
  { name: "UI Kits & Design", detail: "Templates and assets", icon: Layers3, href: "/store" },
  { name: "E-Books & Courses", detail: "Learn and build", icon: BookOpen, href: "/store" },
  { name: "Tech & Gadgets", detail: "Verified gear", icon: Gamepad2, href: "/store" },
  { name: "Lifestyle & Gear", detail: "Everyday essentials", icon: ShoppingBag, href: "/store" },
] as const

const trustItems = [
  { label: "Instant key delivery", icon: Zap },
  { label: "Buyer protection", icon: ShieldCheck },
  { label: "Verified vendors", icon: BadgeCheck },
] as const

const Hero = () => {
  return (
    <section className="border-b border-nuprix-line bg-nuprix-ivory" aria-labelledby="home-hero-title">
      <div className="content-container py-8 small:py-12">
        <div className="grid gap-4 small:grid-cols-[minmax(0,1.28fr)_minmax(360px,.72fr)]">
          <div className="relative overflow-hidden rounded-[24px] border border-nuprix-line bg-white px-6 py-8 shadow-[0_14px_40px_rgba(15,23,42,.06)] small:px-10 small:py-12">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-nuprix-indigo/5 blur-3xl" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-nuprix-line bg-nuprix-mist px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-nuprix-muted">
                <Sparkles className="h-3.5 w-3.5 text-nuprix-indigo" aria-hidden="true" />
                Hybrid marketplace
              </span>
              <Heading
                id="home-hero-title"
                level="h1"
                className="mt-6 max-w-3xl text-[40px] font-bold leading-[1.02] tracking-[-0.055em] text-nuprix-ink xsmall:text-[48px] small:text-[58px]"
              >
                Instant digital assets.
                <span className="block text-nuprix-indigo">Curated physical gear.</span>
              </Heading>
              <p className="mt-5 max-w-2xl text-base leading-7 text-nuprix-muted small:text-lg">
                The all-in-one marketplace for software, templates, licenses, and verified
                dropship products from independent vendors.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LocalizedClientLink
                  href="/store"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-nuprix-indigo px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,.20)] transition hover:-translate-y-0.5 hover:bg-nuprix-indigo-hover"
                >
                  Explore Marketplace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/account/vendor"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-nuprix-line-strong bg-white px-5 text-sm font-semibold text-nuprix-ink transition hover:-translate-y-0.5 hover:border-nuprix-indigo/40"
                >
                  Start Selling
                </LocalizedClientLink>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {trustItems.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-nuprix-line bg-nuprix-ivory px-3 py-1.5 text-xs font-semibold text-nuprix-muted">
                    <Icon className="h-3.5 w-3.5 text-nuprix-indigo" aria-hidden="true" />
                    {String(label)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 small:grid-cols-1">
            <article className="relative overflow-hidden rounded-[24px] border border-violet-200 bg-white p-5 shadow-[0_14px_40px_rgba(124,58,237,.08)]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-nuprix-violet">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Instant delivery
                </span>
                <Download className="h-4 w-4 text-violet-500" aria-hidden="true" />
              </div>
              <p className="mt-7 text-xs font-semibold text-nuprix-muted">License key</p>
              <div className="mt-2 flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50/70 px-4 py-3">
                <code className="font-mono text-sm font-bold tracking-[0.08em] text-violet-800">NPRX-94A2-88F1</code>
                <BadgeCheck className="h-4 w-4 text-violet-600" aria-hidden="true" />
              </div>
            </article>

            <article className="rounded-[24px] border border-nuprix-line bg-nuprix-ink p-5 text-white shadow-[0_14px_40px_rgba(15,23,42,.14)]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Truck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  Tracking in progress
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">Verified</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Vendor payouts</p>
                  <p className="mt-1 text-lg font-bold tabular-nums">৳284K</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Fulfillment</p>
                  <p className="mt-1 text-sm font-bold text-emerald-300">On track</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 small:grid-cols-5">
          {categories.map(({ name, detail, icon: Icon, href }) => (
            <LocalizedClientLink
              key={name}
              href={href}
              className="group flex min-h-[92px] items-center gap-3 rounded-xl border border-nuprix-line bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-nuprix-indigo/30 hover:shadow-[0_10px_24px_rgba(15,23,42,.07)]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-nuprix-mist text-nuprix-indigo">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-nuprix-ink small:text-sm">{name}</span>
                <span className="mt-1 block text-[11px] text-nuprix-subtle">{detail}</span>
              </span>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
