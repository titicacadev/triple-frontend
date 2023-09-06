import { usePopularReviews } from '../services'

import { ReviewsList } from './reviews-list'

interface Props {
  resourceId: string
  resourceType: string
  regionId: string | undefined
  recentTrip: boolean
  placeholderText: string | undefined
  reviewsCount: number | undefined
}

export function PopularReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  placeholderText,
  reviewsCount,
}: Props) {
  const { data, refetch } = usePopularReviews({
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
      sortingOption="recommendation"
      reviewsCount={reviewsCount}
      reviews={data?.popularReviews}
      refetch={refetch}
    />
  )
}
