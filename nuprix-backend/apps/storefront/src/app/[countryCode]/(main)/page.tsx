import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion, listRegions } from "@lib/data/regions"
import { toJsonLd } from "@lib/util/product-structured-data"
import {
  getDefaultCountryCode,
  getSiteOrigin,
  listCountryCodes,
  STORE_NAME,
} from "@lib/util/site"
import { buildRegionsReturnPolicies } from "@lib/util/store-policies"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const dynamic = "force-static"
export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])

  return {
    title: {
      default: "Nuprix — Discover more, shop in one place",
      template: "%s | Nuprix",
    },
    description:
      "Discover useful digital products and carefully selected physical products across technology, lifestyle, home, fashion, and more.",
    applicationName: STORE_NAME,
    openGraph: {
      title: "Nuprix — Discover more, shop in one place",
      description:
        "Discover useful digital products and carefully selected physical products across technology, lifestyle, home, fashion, and more.",
      url: `${origin}/${countryCode}`,
      siteName: STORE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${origin}/${countryCode}`,
      languages: {
        ...Object.fromEntries(
          listCountryCodes(regions).map((code) => [
            `en-${code.toUpperCase()}`,
            `${origin}/${code}`,
          ])
        ),
        "x-default": origin,
      },
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const [region, regions, { collections }] = await Promise.all([
    getRegion(countryCode),
    listRegions(),
    listCollections({ fields: "id, handle, title" }),
  ])

  if (!region) {
    const fallbackCountryCode = getDefaultCountryCode(regions)

    return (
      <section className="content-container py-20 text-center" role="status">
        <h1 className="text-2xl font-semibold tracking-tight text-[#172b20]">
          Nuprix is unavailable for this location
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#66736a]">
          We couldn&apos;t load the store region for this page. Please try again
          later.
        </p>
        {fallbackCountryCode && (
          <a
            href={`/${fallbackCountryCode}`}
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#172b20] px-5 text-sm font-semibold text-white transition hover:bg-[#294b35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#548365]"
          >
            Browse the available Nuprix store
          </a>
        )}
      </section>
    )
  }

  const origin = await getSiteOrigin()
  const homeUrl = `${origin}/${countryCode}`
  const returnPolicies = buildRegionsReturnPolicies(regions)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: STORE_NAME,
      url: origin,
      ...(returnPolicies.length
        ? { hasMerchantReturnPolicy: returnPolicies }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: STORE_NAME,
      url: homeUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${homeUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(structuredData) }}
      />
      <Hero />
      {collections?.length ? (
        <div className="border-t border-nuprix-line/70 bg-nuprix-paper py-4">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      ) : (
        <section
          className="content-container py-16 text-center small:py-24"
          aria-labelledby="featured-products-heading"
        >
          <h2
            id="featured-products-heading"
            className="text-2xl font-semibold tracking-tight text-[#172b20]"
          >
            No featured collections right now
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#66736a]">
            Explore all products currently available at Nuprix.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#172b20] px-5 text-sm font-semibold text-white transition hover:bg-[#294b35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#548365]"
          >
            Browse all products
          </LocalizedClientLink>
        </section>
      )}
    </>
  )
}
