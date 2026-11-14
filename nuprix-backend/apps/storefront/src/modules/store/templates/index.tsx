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
    <div className="py-6 content-container" data-testid="category-container">
      <div className="mb-8 border-b border-[#e6eae3] pb-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#71917a]">
          Find your next favorite
        </p>
        <h1
          data-testid="store-page-title"
          className="text-3xl font-semibold tracking-[-0.04em] text-[#172b20] small:text-4xl"
        >
          All products
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#788279]">
          Explore the Nuprix collection, then use search and filters to narrow
          down what you are looking for.
        </p>
      </div>

      <div className="flex flex-col small:flex-row small:items-start">
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
