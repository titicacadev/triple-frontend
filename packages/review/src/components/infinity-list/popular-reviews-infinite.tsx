import { useInfinitePopularReviews } from '../../services'
import { ReviewsInfiniteList } from '../reviews-infnite-list'
import type { SortingType } from '../sorting-context'

import type { InfinityReviewProps } from './types'

export function PopularReviewsInfinite({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sortingType,
}: InfinityReviewProps & { sortingType?: SortingType }) {
  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfinitePopularReviews({
      resourceId,
      resourceType,
      recentTrip,
      hasMedia,
    })

  return (
    <ReviewsInfiniteList
      resourceId={resourceId}
      resourceType={resourceType}
      regionId={regionId}
      hasMedia={hasMedia}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingType={sortingType}
      sortingOption="recommendation"
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
