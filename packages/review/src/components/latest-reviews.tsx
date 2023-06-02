import { useLatestReviews } from '../services'

import { ReviewsList } from './reviews-list'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  placeholderText: string | undefined
  reviewsCount: number | undefined
}

export function LatestReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  placeholderText,
  reviewsCount,
}: Props) {
  const { data, refetch } = useLatestReviews({
    resourceId,
    resourceType,
    recentTrip,
  })

  return (
    <ReviewsList
      resourceId={resourceId}
      resourceType={resourceType}
      regionId={regionId}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingOption="latest"
      reviewsCount={reviewsCount}
      reviews={data?.latestReviews}
      refetch={refetch}
    />
  )
}
