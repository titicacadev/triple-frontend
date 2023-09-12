import { useLatestReviews } from '../../services'
import { ReviewsList } from '../reviews-list'
import type { SortingType } from '../sorting-context'

import type { ShortenReview } from './types'

export function LatestReviews({
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
  const { data, refetch } = useLatestReviews({
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
      sortingOption="latest"
      reviewsCount={reviewsCount}
      reviews={data?.latestReviews}
      refetch={refetch}
    />
  )
}
