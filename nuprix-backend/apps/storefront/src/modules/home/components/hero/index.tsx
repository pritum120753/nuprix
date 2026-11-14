import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const benefits = [
  {
    number: "01",
    title: "Browse your way",
    description: "Find useful products across technology, home, fashion, and more.",
  },
  {
    number: "02",
    title: "Physical and digital",
    description: "Shop shippable products and digital downloads in one catalog.",
  },
  {
    number: "03",
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
    <div className="bg-[#f7f7f2] text-[#17211b]">
      <section className="relative isolate overflow-hidden" aria-labelledby="home-hero-title">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#d9eddf] blur-3xl" />
          <div className="absolute -bottom-64 left-[22%] h-[34rem] w-[34rem] rounded-full bg-[#e9e3fa] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#53645a_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
        </div>

        <div className="content-container grid items-center gap-12 py-14 small:min-h-[560px] small:grid-cols-[1.1fr_.9fr] small:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd8cd] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#42644d]">
              <span className="h-2 w-2 rounded-full bg-[#5c9b6c]" />
              Physical finds. Digital downloads.
            </span>

            <Heading id="home-hero-title" level="h1" className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-[#17211b] small:text-7xl">
              Everyday finds.
              <span className="block text-[#548365]">Digital discoveries.</span>
            </Heading>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#5d6a60] small:text-lg">
              Explore physical products and digital downloads across technology,
              lifestyle, home, fashion, and more.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LocalizedClientLink
                href="/store"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#203b29] px-6 text-base font-semibold text-white transition-colors hover:bg-[#31563c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548365] focus-visible:ring-offset-2"
              >
                Browse all products
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/search"
                className="inline-flex min-h-12 items-center rounded-md px-4 text-sm font-semibold text-[#294b35] transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548365] focus-visible:ring-offset-2"
              >
                Search Nuprix <span className="ml-2" aria-hidden="true">→</span>
              </LocalizedClientLink>
            </div>

            <p className="mt-8 text-xs font-medium tracking-wide text-[#68766b]">
              SHOP PRODUCTS <span className="mx-2">·</span> DOWNLOAD DIGITAL GOODS
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-5 rotate-[-5deg] rounded-[2rem] bg-[#dce9dc]" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-[#172b20] p-6 text-white shadow-[0_28px_80px_rgba(27,52,35,0.18)] small:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8d3bd]">The Nuprix marketplace</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-widest text-[#d6e7d8]">Explore</span>
              </div>
              <div className="mt-10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#a9c6ae]">Find your next favorite</div>
                <div className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] small:text-5xl">
                  Shop what you need.
                  <span className="block text-[#b8e0bd]">Discover what you love.</span>
                </div>
                <p className="mt-5 max-w-xs text-sm leading-6 text-[#d0ddd1]">
                  Browse a mix of physical products and downloadable goods.
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

      <section className="border-y border-[#e3e8df] bg-white/65">
        <div className="content-container grid gap-7 py-9 small:grid-cols-3 small:gap-10 small:py-11">
          {benefits.map((benefit) => (
            <article key={benefit.number} className="flex gap-4">
              <span className="pt-1 text-xs font-semibold tracking-widest text-[#71917a]">{benefit.number}</span>
              <div>
                <h2 className="text-sm font-semibold text-[#24372a]">{benefit.title}</h2>
                <p className="mt-1 max-w-xs text-sm leading-6 text-[#758078]">{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
