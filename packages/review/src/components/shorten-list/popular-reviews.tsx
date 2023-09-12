import { usePopularReviews } from '../../services'
import { ReviewsList } from '../reviews-list'
import type { SortingType } from '../sorting-context'

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

export function PopularReviews({
  resourceId,
  resourceType,
  regionId,
  recentTrip,
  hasMedia,
  placeholderText,
  reviewsCount,
  sortingType,
}: Props) {
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
