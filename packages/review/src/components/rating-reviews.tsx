import { useRatingReviews } from '../services'

import { ReviewsList } from './reviews-list'

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

export function RatingReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sort,
}: Props) {
  const { data, refetch } = useRatingReviews({
    resourceId,
    resourceType,
    recentTrip,
    hasMedia,
    sortBy: {
      rating: sort,
    },
  })

  return (
    <ReviewsList
      resourceId={resourceId}
      resourceType={resourceType}
      regionId={regionId}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingOption={
        sort !== undefined ? `reviews-rating-${sort}` : `reviews-rating-asc`
      }
      reviewsCount={reviewsCount}
      reviews={data?.ratingReviews}
      refetch={refetch}
    />
  )
}
