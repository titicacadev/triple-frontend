import { useReviewLanguage } from '../language-context'
import type { SortingType } from '../sorting-context'

import { ReviewsList } from './reviews-list'
import { usePopularReviews } from './services'
import type { ShortenReview } from './types'

export function PopularReviews({
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
  const { lang } = useReviewLanguage()
  const { data, refetch } = usePopularReviews({
    resourceId,
    resourceType,
    recentTrip,
    hasMedia,
    lang,
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
      sortingOption="recommendation"
      reviewsCount={reviewsCount}
      reviews={data?.popularReviews}
      refetch={refetch}
    />
  )
}
