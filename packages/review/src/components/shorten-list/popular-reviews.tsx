import { usePopularReviews } from '../../services'
import { ReviewsList } from '../reviews-list'
import type { SortingType } from '../sorting-context'

import type { ShortenReview } from './types'

export function PopularReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sortingType,
}: ShortenReview & { sortingType?: SortingType }) {
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
