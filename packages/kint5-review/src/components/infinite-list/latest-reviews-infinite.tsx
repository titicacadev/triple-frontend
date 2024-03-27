import { useReviewLanguage } from '../language-context'
import { ReviewMediaPopup } from '../review-media-popup'
import type { SortingType } from '../sorting-context'

import { InfiniteList } from './infinite-list'
import { useInfiniteLatestReviews } from './services'
import type { InfiniteReviewProps } from './types'

export function LatestReviewsInfinite({
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
  const { data, hasNextPage, isLoading, fetchNextPage, refetch } =
    useInfiniteLatestReviews({
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
        sortingOption="latest"
        reviewsCount={reviewsCount}
        reviews={reviews}
        hasNextPage={hasNextPage}
        isLoadingReviews={isLoading}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
      <ReviewMediaPopup reviews={reviews} />
    </>
  )
}
