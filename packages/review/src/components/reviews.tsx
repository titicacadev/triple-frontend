import { useEffect } from 'react'
import { Trans } from '@titicaca/next-i18next'
import { FlexBox, Section, Container, Text } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { LoginCtaModalProvider } from '@titicaca/modals'

import { useReviewCount } from '../services'

import { PopularReviewsInfinite } from './popular-reviews-infinite'
import { LatestReviewsInfinite } from './latest-reviews-infinite'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingType } from './sorting-context'
import { FilterProvider, useReviewFilters } from './filter-context'
import { SortingOptions } from './sorting-options'
import { Filters } from './filter'

const REVIEWS_SECTION_ID = 'reviews'

interface ReviewsProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount: number
  sortingType?: SortingType
  placeholderText?: string
  isMorePage?: boolean
}

export function Reviews({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  sortingType = 'default',
  placeholderText,
}: ReviewsProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider>
        <SortingOptionsProvider type={sortingType} resourceId={resourceId}>
          <ReviewsComponent
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

const REVIEW_INFINITY_LIST_TYPES = {
  recommendation: PopularReviewsInfinite,
  latest: LatestReviewsInfinite,
  'reviews-rating-desc': Container,
  'reviews-rating-asc': Container,
}

function ReviewsComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
}: Omit<
  ReviewsProps,
  'initialRecentTrip' | 'initialSortingOption' | 'sortingType'
>) {
  const { isRecentTrip } = useReviewFilters()
  const { selectedOption } = useReviewSortingOptions()

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

  const ListElement = REVIEW_INFINITY_LIST_TYPES[selectedOption]

  return (
    <Section anchor={REVIEWS_SECTION_ID}>
      <Container>
        <Trans
          i18nKey={[
            'totalreviewscount-gaeyi-ribyu',
            '<0> {{totalReviewsCount}}</0><1>개의 리뷰</1>',
          ]}
          ns="common-web"
        >
          <Text bold size="huge" color="blue" alpha={1} inline>
            <>
              {{
                totalReviewsCount: formatNumber(reviewsCountData?.reviewsCount),
              }}
            </>
          </Text>
          <Text bold size="huge" color="gray" alpha={1} inline />
        </Trans>
      </Container>

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
