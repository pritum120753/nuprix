"use client"

import type { Hit } from "instantsearch.js"
import { useEffect, useRef } from "react"
import { useHits, useInstantSearch } from "react-instantsearch"

import useSearchSettled from "@lib/hooks/use-search-settled"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import SearchPagination from "./pagination"
import HitPrice, { HitPricing } from "./price"

type ProductHit = Hit<
  {
    title: string | null
    handle: string | null
    thumbnail: string | null
  } & HitPricing
>

type StoreHitsProps = {
  hitsPerPage: number
  currencyCode: string
}

const StoreHits = ({ hitsPerPage, currencyCode }: StoreHitsProps) => {
  const { items } = useHits<ProductHit>()
  const { status, error, indexUiState } = useInstantSearch()
  const { isSearching, hasNoResultsYet } = useSearchSettled()

  const { page, ...refinements } = indexUiState
  const currentPage = page ?? 1
  const refinementKey = JSON.stringify(refinements)

  const settled = useRef({ page: currentPage, refinementKey })

  useEffect(() => {
    if (!isSearching) {
      settled.current = { page: currentPage, refinementKey }
    }
  }, [isSearching, currentPage, refinementKey])

  const isPagingOnly =
    refinementKey === settled.current.refinementKey &&
    currentPage !== settled.current.page

  const showSkeleton = hasNoResultsYet || (isSearching && isPagingOnly)

  if (status === "error") {
    return (
      <Text
        className="py-16 text-center text-ui-fg-error"
        data-testid="products-error"
      >
        Couldn&apos;t load products
        {error?.message ? `: ${error.message}` : "."}
      </Text>
    )
  }

  return (
    <>
      {showSkeleton ? (
        <SkeletonProductGrid numberOfProducts={hitsPerPage} />
      ) : !items.length ? (
        <Text
          className="py-16 text-center text-ui-fg-subtle"
          data-testid="no-products"
        >
          No products matched these filters.
        </Text>
      ) : (
        <ul
          className="grid w-full grid-cols-2 gap-x-3 gap-y-5 small:grid-cols-3 small:gap-x-5 small:gap-y-8 medium:grid-cols-4"
          data-testid="products-list"
        >
          {items.map((hit) =>
            hit.handle ? (
              <li key={hit.objectID}>
                <LocalizedClientLink
                  href={`/products/${hit.handle}`}
                  className="group"
                >
                  <article
                    className="rounded-[16px] border border-nuprix-line bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,.03)] transition duration-300 group-hover:-translate-y-1 group-hover:border-nuprix-indigo/30 group-hover:shadow-[0_18px_40px_rgba(15,23,42,.10)]"
                    data-testid="product-wrapper"
                  >
                    <Thumbnail thumbnail={hit.thumbnail} size="full" />
                    <div className="flex txt-compact-medium mt-4 justify-between gap-3 px-1 pb-1">
                      <Text
                        className="line-clamp-2 font-semibold leading-5 text-nuprix-charcoal"
                        data-testid="product-title"
                      >
                        {hit.title}
                      </Text>
                      <HitPrice hit={hit} currencyCode={currencyCode} />
                    </div>
                  </article>
                </LocalizedClientLink>
              </li>
            ) : null
          )}
        </ul>
      )}
      <SearchPagination />
    </>
  )
}

export default StoreHits
