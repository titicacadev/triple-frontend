import { useReviewLanguage } from '../language-context'
import type { SortingType } from '../sorting-context'

import { InfiniteList } from './infinite-list'
import { useInfiniteRatingReviews } from './services'
import type { ExtendInfiniteReviewProps } from './types'

export function RatingReviewsInfinite({
  value: {
    isGlobal,
    resourceId,
    resourceType,
    regionId,
    recentTrip,
    hasMedia,
    placeholderText,
    reviewsCount,
    sortingLabel,
    sortingType,
  },
}: {
  value: ExtendInfiniteReviewProps & { sortingType?: SortingType }
}) {
  const sort = sortingLabel.replace(/^star-rating-/, '')

  const { reviewLang } = useReviewLanguage()
  const { data, hasNextPage, isLoading, fetchNextPage, refetch } =
    useInfiniteRatingReviews({
      resourceId,
      resourceType,
      recentTrip,
      hasMedia,
      sortBy: {
        rating: sort,
      },
      lang: reviewLang,
    })

  return (
    <InfiniteList
      isGlobal={isGlobal}
      resourceId={resourceId}
      resourceType={resourceType}
      regionId={regionId}
      hasMedia={hasMedia}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingType={sortingType}
      sortingOption={sortingLabel}
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      isLoadingReviews={isLoading}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
