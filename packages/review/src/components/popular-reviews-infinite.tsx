import { useInfinitePopularReviews } from '../services'

import { ReviewsInfiniteList } from './reviews-infnite-list'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  placeholderText: string | undefined
  reviewsCount: number | undefined
}

export function PopularReviewsInfinite({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  placeholderText,
  reviewsCount,
}: Props) {
  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfinitePopularReviews({
      resourceId,
      resourceType,
      recentTrip,
    })

  return (
    <ReviewsInfiniteList
      resourceId={resourceId}
      resourceType={resourceType}
      regionId={regionId}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingOption="recommendation"
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
