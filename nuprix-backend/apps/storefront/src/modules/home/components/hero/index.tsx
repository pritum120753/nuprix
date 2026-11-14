import { Button, Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden border-b border-ui-border-base bg-[#101827] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="content-container relative flex min-h-[620px] flex-col items-start justify-center py-24 small:py-32">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Your digital marketplace
        </span>
        <Heading level="h1" className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight text-white small:text-7xl">
          Digital products.
          <br />
          <span className="text-cyan-300">Bigger possibilities.</span>
        </Heading>
        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 small:text-lg">
          Discover useful digital resources made to help you learn, create, and move your next idea forward.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <LocalizedClientLink href="/store">
            <Button variant="primary" size="large">
              Explore the store
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/search" className="rounded-md border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300 hover:text-cyan-200">
            Find a product
          </LocalizedClientLink>
        </div>
        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-5 border-t border-white/15 pt-7 text-sm text-slate-300 small:grid-cols-3">
          <div><span className="block text-lg font-semibold text-white">Instant access</span><span className="mt-1 block">Digital-first shopping</span></div>
          <div><span className="block text-lg font-semibold text-white">Curated resources</span><span className="mt-1 block">Useful tools and content</span></div>
          <div><span className="block text-lg font-semibold text-white">Shop with confidence</span><span className="mt-1 block">A simple, secure experience</span></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
