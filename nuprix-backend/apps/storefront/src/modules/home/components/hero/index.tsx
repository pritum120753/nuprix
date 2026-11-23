import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ArrowRight,
  Download,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

const benefits = [
  {
    title: "Browse your way",
    description: "Find useful products across technology, home, fashion, and more.",
  },
  {
    title: "Physical and digital",
    description: "Shop shippable products and digital downloads in one catalog.",
  },
  {
    title: "Choose with confidence",
    description: "Review product information and available options before you buy.",
  },
]

const categories = [
  { name: "Electronics", detail: "Gadgets and tech", tone: "bg-[#dce9dc] text-[#203b29]" },
  { name: "Home & Living", detail: "Everyday essentials", tone: "bg-[#e9e3fa] text-[#39304f]" },
  { name: "Fashion", detail: "Style and accessories", tone: "bg-[#f5e5d7] text-[#68452e]" },
  { name: "Digital Goods", detail: "Files and resources", tone: "bg-[#dce8f4] text-[#29445f]" },
]

const Hero = () => {
  return (
    <div className="bg-nuprix-ivory text-nuprix-ink">
      <section className="relative isolate overflow-hidden" aria-labelledby="home-hero-title">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-nuprix-sage/80 blur-3xl" />
          <div className="absolute -bottom-64 left-[22%] h-[34rem] w-[34rem] rounded-full bg-nuprix-lilac/70 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#53645a_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
        </div>

        <div className="content-container grid items-center gap-10 py-12 small:min-h-[610px] small:grid-cols-[1.08fr_.92fr] small:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-nuprix-line-strong bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-nuprix-pine shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Curated for everyday living
            </span>

            <Heading id="home-hero-title" level="h1" className="mt-7 max-w-3xl text-[46px] font-medium leading-[0.98] tracking-[-0.065em] text-nuprix-ink xsmall:text-[56px] small:text-[68px] medium:text-[76px]">
              Find it here.
              <span className="block text-nuprix-moss">Love it for longer.</span>
            </Heading>

            <p className="mt-7 max-w-xl text-base leading-8 text-nuprix-muted small:text-lg">
              A considered marketplace for useful physical goods and instant digital
              downloads, brought together in one beautifully simple place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LocalizedClientLink
                href="/store"
                className="primary-action"
              >
                Browse all products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/search"
                className="secondary-action"
              >
                Search Nuprix
              </LocalizedClientLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-nuprix-muted">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-nuprix-moss" aria-hidden="true" />
                Secure shopping
              </span>
              <span className="inline-flex items-center gap-2">
                <Package className="h-4 w-4 text-nuprix-moss" aria-hidden="true" />
                Physical delivery
              </span>
              <span className="inline-flex items-center gap-2">
                <Download className="h-4 w-4 text-nuprix-moss" aria-hidden="true" />
                Instant digital access
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute -inset-4 rotate-3 rounded-[32px] border border-nuprix-line-strong bg-nuprix-sage/80" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-nuprix-forest p-6 text-white shadow-[0_28px_80px_rgba(22,53,40,0.22)] small:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#bdd2c2]">The Nuprix edit</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#dfe8df]">New finds</span>
              </div>
              <div className="mt-9">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#aac3af]">Curated across categories</div>
                <div className="mt-3 font-display text-4xl leading-[1.02] tracking-[-0.045em] small:text-5xl">
                  Useful things,
                  <span className="block text-[#bfe0c5]">beautifully found.</span>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[#d0ddd1]">
                  Explore products for work, home, style, and instant access.
                </p>
              </div>
              <ul className="mt-9 grid grid-cols-2 gap-3" aria-label="Examples of what you can discover">
                {categories.map((category) => (
                  <li key={category.name} className={`rounded-2xl p-4 ${category.tone}`}>
                    <div className="text-sm font-semibold">{category.name}</div>
                    <div className="mt-2 text-xs opacity-75">{category.detail}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-[#c4d6c7]">
                <span>Physical + digital</span><span aria-hidden="true">✳</span><span>Nuprix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-nuprix-line bg-white/75">
        <div className="content-container grid gap-7 py-9 small:grid-cols-3 small:gap-10 small:py-11">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-nuprix-line-strong bg-nuprix-paper text-[11px] font-bold text-nuprix-pine">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-sm font-semibold text-nuprix-charcoal">{benefit.title}</h2>
                <p className="mt-1 max-w-xs text-sm leading-6 text-nuprix-muted">{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
