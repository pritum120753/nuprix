import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion, listRegions } from "@lib/data/regions"
import { toJsonLd } from "@lib/util/product-structured-data"
import { getSiteOrigin, listCountryCodes, STORE_NAME } from "@lib/util/site"
import { buildRegionsReturnPolicies } from "@lib/util/store-policies"

export const dynamic = "force-static"
export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])

  return {
    title: {
      default: "Nuprix — Digital products for bigger possibilities",
      template: "%s | Nuprix",
    },
    description:
      "Discover useful digital products, creative resources, and tools at Nuprix.",
    applicationName: STORE_NAME,
    openGraph: {
      title: "Nuprix — Digital products for bigger possibilities",
      description: "Discover useful digital products, creative resources, and tools at Nuprix.",
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
  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])
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
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
