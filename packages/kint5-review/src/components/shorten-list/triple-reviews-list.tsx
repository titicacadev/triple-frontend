import { List, Spinner } from '@titicaca/kint5-core-elements'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { useEffect, useState } from 'react'

import { BaseReviewFragment } from '../../data/graphql'
import { useDescriptions } from '../../services'
// import { FullListButton } from '../full-list-button'
import { OthersReviewActionSheet } from '../others-review-action-sheet'
// import {
// TripleGlobalReviewElement,
// TripleReviewElement,
// } from '../review-element'
import { ReviewsPlaceholder } from '../review-placeholder-with-rating'
import type { SortingType, SortingOption } from '../sorting-context'
import { useReviewLanguage } from '../language-context'

interface Props {
  isGlobal: boolean
  resourceId: string
  resourceType: string
  regionId: string | undefined
  hasMedia: boolean
  recentTrip: boolean
  placeholderText: string | undefined
  sortingType?: SortingType
  sortingOption: SortingOption
  reviewsCount: number | undefined
  reviews: BaseReviewFragment[] | undefined
  refetch: () => void
}

export function TripleReviewsList({
  // isGlobal,
  resourceId,
  resourceType,
  regionId,
  hasMedia,
  recentTrip,
  placeholderText,
  sortingType,
  sortingOption,
  reviewsCount,
  reviews,
  refetch,
}: Props) {
  const { reviewLang } = useReviewLanguage()
  const [selectedReviewId] = useState<string | undefined>(undefined)
  const { subscribeLikedChangeEvent, unsubscribeLikedChangeEvent } =
    useTripleClientActions()

  const { data: descriptionsData } = useDescriptions({
    resourceId,
    resourceType,
    lang: reviewLang,
  })

  useEffect(() => {
    subscribeLikedChangeEvent?.(refetch)

    return () => unsubscribeLikedChangeEvent?.(refetch)
  }, [refetch, subscribeLikedChangeEvent, unsubscribeLikedChangeEvent])

  if (!descriptionsData || !reviews) {
    return <Spinner />
  }

  if (reviews.length === 0) {
    return (
      <ReviewsPlaceholder
        hasReviews={(reviewsCount ?? 0) > 0}
        isMorePage={false}
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        sortingType={sortingType}
        sortingOption={sortingOption}
        hasMedia={hasMedia}
        recentTrip={recentTrip}
        placeholderText={placeholderText}
      />
    )
  }

  // const ReviewElement = isGlobal
  // ? TripleGlobalReviewElement
  // : TripleReviewElement

  return (
    <>
      <List divided margin={{ top: 26 }} verticalGap={48}>
        {reviews.map((review, i) => (
          <p key={i}>test</p>
        ))}
      </List>

      {/* <FullListButton
        reviewsCount={reviewsCount}
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        hasMedia={hasMedia}
        recentTrip={recentTrip}
        sortingType={sortingType}
        sortingOption={sortingOption}
      /> */}

      {selectedReviewId ? (
        <OthersReviewActionSheet reviewId={selectedReviewId} />
      ) : null}
    </>
  )
}
