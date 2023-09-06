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
import type { SortingOption, SortingType } from './sorting-context'
import { FilterProvider, useReviewFilters } from './filter-context'
import { SortingOptions } from './sorting-options'
import { Filters } from './filter'

const REVIEWS_SECTION_ID = 'reviews'

interface ReviewsProps {
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

export function Reviews({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip = false,
  initialSortingOption = '',
  sortingType = 'default',
  placeholderText,
}: ReviewsProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider initialRecentTripFilter={initialRecentTrip}>
        <SortingOptionsProvider
          type={sortingType}
          resourceId={resourceId}
          initialSortingOption={initialSortingOption}
        >
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

      {selectedOption === '' ? (
        <PopularReviewsInfinite
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
          recentTrip={isRecentTrip}
          placeholderText={placeholderText}
          reviewsCount={reviewsCountData?.reviewsCount}
        />
      ) : (
        <LatestReviewsInfinite
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
          recentTrip={isRecentTrip}
          placeholderText={placeholderText}
          reviewsCount={reviewsCountData?.reviewsCount}
        />
      )}
    </Section>
  )
}
