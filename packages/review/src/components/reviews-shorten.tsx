import { useEffect } from 'react'
import { FlexBox, Section, Text } from '@titicaca/core-elements'
import { LoginCtaModalProvider } from '@titicaca/modals'
import { useTranslation } from '@titicaca/next-i18next'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { formatNumber } from '@titicaca/view-utilities'

import { useReviewCount } from '../services'

import { LatestReviews } from './latest-reviews'
import { PopularReviews } from './popular-reviews'
import { WriteButton } from './write-button'
import { FilterProvider, useReviewFilters } from './filter-context'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingOption, SortingType } from './sorting-context'
import { Filters } from './filter'
import { SortingOptions } from './sorting-options'
import { RatingReviews } from './rating-reviews'

const REVIEWS_SECTION_ID = 'reviews'

interface ReviewsShortenProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount: number
  initialSortingOption?: SortingOption
  sortingType?: SortingType
  placeholderText?: string
}

export function ReviewsShorten({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialSortingOption = 'recommendation',
  sortingType = 'poi',
  placeholderText,
}: ReviewsShortenProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider>
        <SortingOptionsProvider
          type={sortingType}
          resourceId={resourceId}
          initialSortingOption={initialSortingOption}
        >
          <ReviewsShortenComponent
            resourceId={resourceId}
            resourceType={resourceType}
            regionId={regionId}
            initialReviewsCount={initialReviewsCount}
            placeholderText={placeholderText}
          />
        </SortingOptionsProvider>
      </FilterProvider>
    </LoginCtaModalProvider>
  )
}

const REVIEW_SHORTEN_LIST_TYPES = {
  recommendation: PopularReviews,
  latest: LatestReviews,
  'star-rating-desc': RatingReviews,
  'star-rating-asc': RatingReviews,
}

function ReviewsShortenComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
}: Omit<ReviewsShortenProps, 'initialRecentTrip' | 'initialSortingOption'>) {
  const { isRecentTrip, isMediaCollection } = useReviewFilters()
  const { selectedOption } = useReviewSortingOptions()
  const { t } = useTranslation('common-web')

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useTripleClientActions()

  const { data: reviewsCountData, refetch: refetchReviewsCount } =
    useReviewCount(
      {
        resourceId,
        resourceType,
        recentTrip: isRecentTrip,
        hasMedia: isMediaCollection,
      },
      initialReviewsCount,
    )

  useEffect(() => {
    subscribeReviewUpdateEvent?.(refetchReviewsCount)

    return () => unsubscribeReviewUpdateEvent?.(refetchReviewsCount)
  }, [
    refetchReviewsCount,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  const ListElement = REVIEW_SHORTEN_LIST_TYPES[selectedOption]

  const sorting = selectedOption.startsWith('star-rating')
    ? selectedOption.replace(/^star-rating-/, '')
    : undefined

  const sort =
    sorting === undefined ? undefined : sorting === 'asc' ? 'asc' : 'desc'

  return (
    <Section anchor={REVIEWS_SECTION_ID}>
      <FlexBox flex alignItems="center">
        <div>
          <Text bold size="huge" color="gray" alpha={1} inline>
            {t(['ribyu', '리뷰'])}
          </Text>
          {(reviewsCountData?.reviewsCount ?? 0) > 0 ? (
            <Text bold size="huge" color="blue" alpha={1} inline>
              {` ${formatNumber(reviewsCountData?.reviewsCount)}`}
            </Text>
          ) : null}
        </div>
        <WriteButton
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
        />
      </FlexBox>

      <FlexBox
        flex
        justifyContent="space-between"
        alignItems="center"
        css={{
          margin: '23px 0 0',
        }}
      >
        <SortingOptions />

        <Filters />
      </FlexBox>

      <ListElement
        resourceId={resourceId}
        resourceType={resourceType}
        regionId={regionId}
        recentTrip={isRecentTrip}
        hasMedia={isMediaCollection}
        placeholderText={placeholderText}
        reviewsCount={reviewsCountData?.reviewsCount}
        sort={sort}
      />
    </Section>
  )
}
