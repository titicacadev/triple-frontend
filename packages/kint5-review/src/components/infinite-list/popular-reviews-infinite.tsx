import { useReviewLanguage } from '../language-context'
import { ReviewMediaPopup } from '../review-media-popup'
import type { SortingType } from '../sorting-context'

import { InfiniteList } from './infinite-list'
import { useInfinitePopularReviews } from './services'
import type { InfiniteReviewProps } from './types'

export function PopularReviewsInfinite({
  value: {
    isGlobal,
    resourceId,
    resourceType,
    regionId,
    recentTrip,
    hasMedia,
    placeholderText,
    reviewsCount,
    sortingType,
  },
}: {
  value: InfiniteReviewProps & { sortingType?: SortingType }
}) {
  const { reviewLang } = useReviewLanguage()
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfinitePopularReviews({
    resourceId,
    resourceType,
    recentTrip,
    hasMedia,
    lang: reviewLang,
  })

  const reviews = data?.pages.flat() ?? []

  return (
    <>
      <InfiniteList
        isGlobal={isGlobal}
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        hasMedia={hasMedia}
        recentTrip={recentTrip}
        placeholderText={placeholderText}
        sortingType={sortingType}
        sortingOption="recommendation"
        reviewsCount={reviewsCount}
        reviews={reviews}
        hasNextPage={hasNextPage}
        isLoadingReviews={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
      <ReviewMediaPopup reviews={reviews} />
    </>
  )
}
