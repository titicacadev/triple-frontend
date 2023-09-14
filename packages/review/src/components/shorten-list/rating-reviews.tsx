import { useRatingReviews } from '../../services'
import type { SortingType } from '../sorting-context'

import { ReviewsList } from './reviews-list'
import type { ExtendShortenReview } from './types'

export function RatingReviews({
  value: {
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
  value: ExtendShortenReview & { sortingType?: SortingType }
}) {
  const sort = sortingLabel.replace(/^star-rating-/, '')

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
      sortingOption={sortingLabel}
      reviewsCount={reviewsCount}
      reviews={data?.ratingReviews}
      refetch={refetch}
    />
  )
}
