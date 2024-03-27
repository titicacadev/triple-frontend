import { useReviewLanguage } from '../language-context'
import { ReviewSkeleton } from '../review-skeleton'
import type { SortingType } from '../sorting-context'

import { ReviewsList } from './reviews-list'
import { useRatingReviews } from './services'
import type { ExtendShortenReview } from './types'

export function RatingReviews({
  value: {
    isGlobal,
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
  value: ExtendShortenReview & { sortingType?: SortingType }
}) {
  const sort = sortingLabel.replace(/^star-rating-/, '')

  const { reviewLang } = useReviewLanguage()
  const { data, isLoading, refetch } = useRatingReviews({
    resourceId,
    resourceType,
    recentTrip,
    hasMedia,
    sortBy: {
      rating: sort,
    },
    lang: reviewLang,
  })

  if (isLoading) {
    return <ReviewSkeleton />
  }

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
      sortingOption={sortingLabel}
      reviewsCount={reviewsCount}
      reviews={data?.ratingReviews}
      refetch={refetch}
    />
  )
}
