import { useInfiniteRatingReviews } from '../../services'
import type { SortingType } from '../sorting-context'

import { InfiniteList } from './infinite-list'
import type { ExtendInfiniteReviewProps } from './types'

export function RatingReviewsInfinite({
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
  value: ExtendInfiniteReviewProps & { sortingType?: SortingType }
}) {
  const sort = sortingLabel.replace(/^star-rating-/, '')

  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteRatingReviews({
      resourceId,
      resourceType,
      recentTrip,
      hasMedia,
      sortBy: {
        rating: sort,
      },
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
      sortingOption={sortingLabel}
      reviewsCount={reviewsCount}
      reviews={data?.pages.flat()}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  )
}
