import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  BadgeCheck,
  Bot,
  Boxes,
  ChevronRight,
  CreditCard,
  Crown,
  KeyRound,
  Laptop,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react"

const promoCards = [
  {
    title: "Instant license keys",
    detail: "Software & digital products",
    href: "/store",
    icon: KeyRound,
    tone: "bg-violet-600",
  },
  {
    title: "AI tools & subscriptions",
    detail: "Verified accounts and access",
    href: "/store",
    icon: Bot,
    tone: "bg-nuprix-indigo",
  },
  {
    title: "Verified dropship gear",
    detail: "Fast, trackable physical delivery",
    href: "/store",
    icon: PackageCheck,
    tone: "bg-emerald-600",
  },
] as const

const iconCategories = [
  { name: "Top-Up", icon: CreditCard },
  { name: "Software", icon: Laptop },
  { name: "AI Tools", icon: Bot },
  { name: "Subscriptions", icon: Crown },
  { name: "License Keys", icon: KeyRound },
  { name: "Physical Gear", icon: ShoppingBag },
] as const

const Hero = () => {
  return (
    <section className="border-b border-nuprix-line bg-nuprix-ivory" aria-label="Marketplace promotions">
      <div className="content-container py-4 small:py-5">
        <div className="grid grid-cols-1 gap-3 small:grid-cols-3">
          {promoCards.map(({ title, detail, href, icon: Icon, tone }) => (
            <LocalizedClientLink
              key={title}
              href={href}
              className={`${tone} group relative flex min-h-[108px] items-center overflow-hidden rounded-xl px-5 py-4 text-white shadow-[0_8px_24px_rgba(15,23,42,.10)] transition duration-200 hover:-translate-y-0.5`}
            >
              <div className="relative z-10 min-w-0 pr-12">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/75">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Instant marketplace
                </p>
                <h2 className="mt-2 text-base font-bold leading-5 small:text-lg">{title}</h2>
                <p className="mt-1 text-xs text-white/80">{detail}</p>
              </div>
              <span className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <ChevronRight className="absolute bottom-3 right-3 h-4 w-4 translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
            </LocalizedClientLink>
          ))}
        </div>

        <nav className="no-scrollbar mt-3 flex overflow-x-auto rounded-xl border border-nuprix-line bg-white p-2" aria-label="Product categories">
          {iconCategories.map(({ name, icon: Icon }) => (
            <LocalizedClientLink
              key={name}
              href="/store"
              className="flex min-w-[112px] flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-nuprix-muted transition hover:bg-nuprix-mist hover:text-nuprix-indigo small:min-w-0 small:text-sm"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {name}
            </LocalizedClientLink>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default Hero
