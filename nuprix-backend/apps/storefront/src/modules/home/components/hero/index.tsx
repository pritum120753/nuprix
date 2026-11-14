import { Button, Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const benefits = [
  {
    number: "01",
    title: "More to discover",
    description: "Explore products across technology, lifestyle, home, fashion, and more.",
  },
  {
    number: "02",
    title: "Digital and physical",
    description: "Choose instant digital access or products delivered to your door.",
  },
  {
    number: "03",
    title: "One simple store",
    description: "Find what you need, compare options, and check out in one place.",
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
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#d9eddf] blur-3xl" />
          <div className="absolute -bottom-64 left-[22%] h-[34rem] w-[34rem] rounded-full bg-[#e9e3fa] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#53645a_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
        </div>

        <div className="content-container grid min-h-[560px] items-center gap-12 py-20 small:grid-cols-[1.1fr_.9fr] small:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd8cd] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#42644d]">
              <span className="h-2 w-2 rounded-full bg-[#5c9b6c]" />
              One store. More possibilities.
            </span>

            <Heading level="h1" className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-[#17211b] small:text-7xl">
              Discover more.
              <span className="block text-[#548365]">Shop without limits.</span>
            </Heading>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#5d6a60] small:text-lg">
              Explore useful digital goods and carefully selected physical products
              across technology, lifestyle, home, fashion, and more — all in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LocalizedClientLink href="/store">
                <Button variant="primary" size="large">Explore all products</Button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/search" className="inline-flex min-h-12 items-center rounded-md px-4 text-sm font-semibold text-[#294b35] transition hover:bg-white/70">
                Search Nuprix <span className="ml-2" aria-hidden="true">→</span>
              </LocalizedClientLink>
            </div>

            <p className="mt-8 text-xs font-medium tracking-wide text-[#7a877d]">
              DIGITAL GOODS <span className="mx-2">·</span> PHYSICAL PRODUCTS
              <span className="mx-2">·</span> ONE CHECKOUT
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-5 rotate-[-5deg] rounded-[2rem] bg-[#dce9dc]" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-[#172b20] p-6 text-white shadow-[0_28px_80px_rgba(27,52,35,0.18)] small:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8d3bd]">The Nuprix marketplace</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-widest text-[#d6e7d8]">Discover</span>
              </div>
              <div className="mt-10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#a9c6ae]">Whatever you are looking for</div>
                <div className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] small:text-5xl">
                  Find it here.
                  <span className="block text-[#b8e0bd]">Make it yours.</span>
                </div>
                <p className="mt-5 max-w-xs text-sm leading-6 text-[#d0ddd1]">
                  Everyday products and digital discoveries, brought together in one shopping experience.
                </p>
              </div>
              <div className="mt-9 grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div key={category.name} className={`rounded-2xl p-4 ${category.tone}`}>
                    <div className="text-sm font-semibold">{category.name}</div>
                    <div className="mt-2 text-xs opacity-75">{category.detail}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-[#c4d6c7]">
                <span>Digital + physical</span><span aria-hidden="true">✳</span><span>Nuprix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e3e8df] bg-white/65">
        <div className="content-container grid gap-7 py-9 small:grid-cols-3 small:gap-10 small:py-11">
          {benefits.map((benefit) => (
            <div key={benefit.number} className="flex gap-4">
              <span className="pt-1 text-xs font-semibold tracking-widest text-[#71917a]">{benefit.number}</span>
              <div>
                <h2 className="text-sm font-semibold text-[#24372a]">{benefit.title}</h2>
                <p className="mt-1 max-w-xs text-sm leading-6 text-[#758078]">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
