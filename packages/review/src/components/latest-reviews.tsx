import { useLatestReviews } from '../services'

import { ReviewsList } from './reviews-list'
import type { SortingType } from './sorting-context'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  hasMedia: boolean
  placeholderText: string | undefined
  reviewsCount: number | undefined
  sortingType?: SortingType
}

export function LatestReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sortingType,
}: Props) {
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
