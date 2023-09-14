import { usePopularReviews } from '../../services'
import type { SortingType } from '../sorting-context'

import { ReviewsList } from './reviews-list'
import type { ShortenReview } from './types'

export function PopularReviews({
  value: {
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
  value: ShortenReview & { sortingType?: SortingType }
}) {
  const { data, refetch } = usePopularReviews({
    resourceId,
    resourceType,
    recentTrip,
    hasMedia,
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
      sortingOption="recommendation"
      reviewsCount={reviewsCount}
      reviews={data?.popularReviews}
      refetch={refetch}
    />
  )
}
