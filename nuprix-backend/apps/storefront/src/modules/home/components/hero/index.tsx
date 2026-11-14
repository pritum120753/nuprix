import { Button, Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const benefits = [
  {
    number: "01",
    title: "Instant access",
    description: "Get your digital purchase without waiting for shipping.",
  },
  {
    number: "02",
    title: "Made to be useful",
    description: "Discover resources that help you learn, work, and create.",
  },
  {
    number: "03",
    title: "A simpler checkout",
    description: "A clear, straightforward way to shop for digital goods.",
  },
]

const Hero = () => {
  return (
    <div className="bg-[#f7f7f2] text-[#17211b]">
      <section className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-[#d9eddf] blur-3xl" />
          <div className="absolute -bottom-64 left-[22%] h-[34rem] w-[34rem] rounded-full bg-[#e9e3fa] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(#53645a_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
        </div>

        <div className="content-container grid min-h-[590px] items-center gap-12 py-20 small:grid-cols-[1.1fr_.9fr] small:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd8cd] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#42644d]">
              <span className="h-2 w-2 rounded-full bg-[#5c9b6c]" />
              A better way to go digital
            </span>

            <Heading
              level="h1"
              className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-[#17211b] small:text-7xl"
            >
              Good ideas deserve
              <span className="block text-[#548365]">great digital tools.</span>
            </Heading>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#5d6a60] small:text-lg">
              Find thoughtful digital products for the way you learn, work, and
              create. Buy once, access online, and get straight to what matters.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LocalizedClientLink href="/store">
                <Button variant="primary" size="large">
                  Explore digital products
                </Button>
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/search"
                className="inline-flex min-h-12 items-center rounded-md px-4 text-sm font-semibold text-[#294b35] transition hover:bg-white/70"
              >
                Search the store <span className="ml-2" aria-hidden="true">→</span>
              </LocalizedClientLink>
            </div>

            <p className="mt-8 text-xs font-medium tracking-wide text-[#7a877d]">
              DIGITAL-FIRST SHOPPING <span className="mx-2">·</span> BUILT FOR
              EVERYDAY PROGRESS
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-5 rotate-[-5deg] rounded-[2rem] bg-[#dce9dc]" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-[#172b20] p-6 text-white shadow-[0_28px_80px_rgba(27,52,35,0.18)] small:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8d3bd]">
                  The Nuprix edit
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-widest text-[#d6e7d8]">
                  Explore
                </span>
              </div>

              <div className="mt-12">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#a9c6ae]">
                  Make room for
                </div>
                <div className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] small:text-5xl">
                  your next
                  <span className="block text-[#b8e0bd]">big thing.</span>
                </div>
                <p className="mt-5 max-w-xs text-sm leading-6 text-[#d0ddd1]">
                  Useful downloads. Fresh inspiration. More ways to move
                  forward.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#d9eadb] p-4 text-[#203b29]">
                  <div className="text-2xl font-semibold">01</div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-wider">
                    Discover
                  </div>
                </div>
                <div className="rounded-2xl bg-[#e9e3fa] p-4 text-[#39304f]">
                  <div className="text-2xl font-semibold">02</div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-wider">
                    Download
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-[#c4d6c7]">
                <span>Ideas into action</span>
                <span aria-hidden="true">✳</span>
                <span>Nuprix.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e3e8df] bg-white/65">
        <div className="content-container grid gap-7 py-9 small:grid-cols-3 small:gap-10 small:py-11">
          {benefits.map((benefit) => (
            <div key={benefit.number} className="flex gap-4">
              <span className="pt-1 text-xs font-semibold tracking-widest text-[#71917a]">
                {benefit.number}
              </span>
              <div>
                <h2 className="text-sm font-semibold text-[#24372a]">
                  {benefit.title}
                </h2>
                <p className="mt-1 max-w-xs text-sm leading-6 text-[#758078]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
