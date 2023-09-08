import { useInfiniteRatingReviews } from '../services'

import { ReviewsInfiniteList } from './reviews-infnite-list'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  hasMedia: boolean
  placeholderText: string | undefined
  reviewsCount: number | undefined
  sort: 'asc' | 'desc' | undefined
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
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingOption={
        sort !== undefined ? `reviews-rating-${sort}` : `reviews-rating-asc`
      }
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
