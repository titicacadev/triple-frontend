import { useRatingReviews } from '../../services'
import { ReviewsList } from '../reviews-list'
import type { SortingType } from '../sorting-context'

import type { ExtendShortenReview } from './types'

export function RatingReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sort,
  sortingType,
}: ExtendShortenReview & { sortingType?: SortingType }) {
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
      hasMedia={hasMedia}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingType={sortingType}
      sortingOption={
        sort !== undefined ? `star-rating-${sort}` : `star-rating-asc`
      }
      reviewsCount={reviewsCount}
      reviews={data?.ratingReviews}
      refetch={refetch}
    />
  )
}
