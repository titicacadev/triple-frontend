import { useReviewLanguage } from '../language-context'
import { ReviewMediaPopup } from '../review-media-popup'
import type { SortingType } from '../sorting-context'

import { InfiniteList } from './infinite-list'
import { useInfiniteLatestReviews } from './services'
import type { InfiniteReviewProps } from './types'

export function LatestReviewsInfinite({
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
  value: InfiniteReviewProps & { sortingType?: SortingType }
}) {
  const { lang } = useReviewLanguage()
  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteLatestReviews({
      resourceId,
      resourceType,
      recentTrip,
      hasMedia,
      lang,
    })

  const reviews = data?.pages.flat() ?? []

  return (
    <>
      <InfiniteList
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
        reviews={reviews}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
      <ReviewMediaPopup reviews={reviews} />
    </>
  )
}
