"use client"

import type { SearchClient } from "instantsearch.js"
import { Configure, InstantSearch } from "react-instantsearch"

import { PRODUCT_INDEX_NAME, searchClient } from "@lib/search-client"
import StoreHits from "@modules/store/components/store-hits"
import StoreRefinements from "@modules/store/components/store-refinements"
import StoreSearchBox from "@modules/store/components/store-search-box"

const PRODUCT_LIMIT = 12

const StoreTemplate = ({ currencyCode }: { currencyCode: string }) => {
  return (
    <div className="py-8 content-container small:py-12" data-testid="category-container">
      <div className="mb-8 overflow-hidden rounded-[24px] border border-nuprix-line bg-nuprix-paper px-6 py-8 small:px-9 small:py-10">
        <p className="mb-3 section-kicker">
          Find your next favorite
        </p>
        <h1
          data-testid="store-page-title"
          className="font-display text-4xl font-medium tracking-[-0.04em] text-nuprix-forest small:text-5xl"
        >
          All products
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-nuprix-muted">
          Explore the Nuprix collection, then use search and filters to narrow
          down what you are looking for.
        </p>
      </div>

      <div className="flex flex-col gap-6 small:flex-row small:items-start">
        <InstantSearch
          indexName={PRODUCT_INDEX_NAME}
          searchClient={searchClient as unknown as SearchClient}
          routing
          future={{ preserveSharedStateOnUnmount: true }}
        >
          <Configure hitsPerPage={PRODUCT_LIMIT} />
          <StoreRefinements currencyCode={currencyCode} />
          <div className="w-full min-w-0">
            <StoreSearchBox />
            <StoreHits
              hitsPerPage={PRODUCT_LIMIT}
              currencyCode={currencyCode}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  )
}

export default StoreTemplate
