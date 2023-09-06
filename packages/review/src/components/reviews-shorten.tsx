import { useEffect } from 'react'
import { Container, FlexBox, Section, Text } from '@titicaca/core-elements'
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

const REVIEWS_SECTION_ID = 'reviews'

interface ReviewsShortenProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount: number
  initialRecentTrip?: boolean
  initialSortingOption?: SortingOption
  sortingType?: SortingType
  placeholderText?: string
  isMorePage?: boolean
}

export function ReviewsShorten({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  sortingType = 'default',
  placeholderText,
}: ReviewsShortenProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider>
        <SortingOptionsProvider type={sortingType} resourceId={resourceId}>
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
  'reviews-rating-desc': Container,
  'reviews-rating-asc': Container,
}

function ReviewsShortenComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
}: Omit<ReviewsShortenProps, 'initialRecentTrip' | 'initialSortingOption'>) {
  const { isRecentTrip } = useReviewFilters()
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
        placeholderText={placeholderText}
        reviewsCount={reviewsCountData?.reviewsCount}
      />
    </Section>
  )
}
