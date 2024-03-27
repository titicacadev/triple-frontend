import { useReviewLanguage } from '../language-context'
import { ReviewMediaPopup } from '../review-media-popup'
import { ReviewSkeleton } from '../review-skeleton'
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
  const { reviewLang } = useReviewLanguage()
  const { data, isLoading, refetch } = useLatestReviews({
    resourceId,
    resourceType,
    recentTrip,
    hasMedia,
    lang: reviewLang,
  })

  const reviews = data?.latestReviews ?? []

  if (isLoading) {
    return <ReviewSkeleton />
  }

  return (
    <>
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
        reviews={reviews}
        refetch={refetch}
      />
      <ReviewMediaPopup reviews={reviews} />
    </>
  )
}
