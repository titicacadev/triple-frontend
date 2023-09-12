import { useInfiniteRatingReviews } from '../../services'
import { ReviewsInfiniteList } from '../reviews-infnite-list'
import type { SortingType } from '../sorting-context'

import type { InfinityReviewProps } from './types'

export function RatingReviewsInfinite({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sort,
  sortingType,
}: InfinityReviewProps & { sort: 'asc' | 'desc'; sortingType?: SortingType }) {
  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteRatingReviews({
      resourceId,
      resourceType,
      recentTrip,
      hasMedia,
      sortBy: {
        rating: sort,
      },
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
      sortingOption={
        sort !== undefined ? `star-rating-${sort}` : `star-rating-asc`
      }
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
