import type { SortingType } from '../sorting-context'

import { InfiniteList } from './infinite-list'
import { useInfiniteLatestReviews } from './services'
import type { InfiniteReviewProps } from './types'

export function LatestReviewsInfinite({
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
  value: InfiniteReviewProps & { sortingType?: SortingType }
}) {
  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteLatestReviews({
      resourceId,
      resourceType,
      recentTrip,
      hasMedia,
    })

  return (
    <InfiniteList
      resourceId={resourceId}
      resourceType={resourceType}
      regionId={regionId}
      hasMedia={hasMedia}
      recentTrip={recentTrip}
      placeholderText={placeholderText}
      sortingType={sortingType}
      sortingOption="latest"
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
