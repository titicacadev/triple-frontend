import type { SortingType } from '../sorting-context'

import { ReviewsList } from './reviews-list'
import { useLatestReviews } from './services'
import type { ShortenReview } from './types'

export function LatestReviews({
  value: {
    isGlobal,
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
      isGlobal={isGlobal}
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
