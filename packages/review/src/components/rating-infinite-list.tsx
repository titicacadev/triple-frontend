import { useInfiniteRatingReviews } from '../services'

import { ReviewsInfiniteList } from './reviews-infnite-list'
import type { SortingType } from './sorting-context'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  hasMedia: boolean
  placeholderText: string | undefined
  reviewsCount: number | undefined
  sort: 'asc' | 'desc' | undefined
  sortingType?: SortingType
}

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
}: Props) {
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
