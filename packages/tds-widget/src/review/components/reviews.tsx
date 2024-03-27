import { ComponentType, useEffect } from 'react'
import styled from 'styled-components'
import { Trans } from '@titicaca/next-i18next'
import { FlexBox, Section, Container, Text } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { LoginCtaModalProvider } from '@titicaca/modals'

import { useReviewCount } from '../services'

import {
  PopularReviewsInfinite,
  LatestReviewsInfinite,
  RatingReviewsInfinite,
} from './infinite-list'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingOption, SortingType } from './sorting-context'
import { FilterProvider, useReviewFilters } from './filter-context'
import { SortingOptions } from './sorting-options'
import { Filters } from './filter'
import type { InfinityReviewValue } from './infinite-list'

const REVIEWS_SECTION_ID = 'reviews'

const OptionContainer = styled(FlexBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 23px 0 0;

  @media (max-width: 359px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`

interface ReviewsProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount?: number
  initialMediaFilter?: boolean
  initialRecentTrip?: boolean
  initialSortingOption?: SortingOption
  sortingType?: SortingType
  placeholderText?: string
  receiverId?: string
}

export function Reviews({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialMediaFilter,
  initialRecentTrip,
  initialSortingOption = 'recommendation',
  sortingType = 'poi',
  placeholderText,
  receiverId,
}: ReviewsProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider
        initialRecentTrip={initialRecentTrip}
        initialMediaFilter={initialMediaFilter}
        receiverId={receiverId}
      >
        <SortingOptionsProvider
          type={sortingType}
          receiverId={receiverId}
          resourceId={resourceId}
          initialSortingOption={initialSortingOption}
        >
          <ReviewsComponent
            resourceId={resourceId}
            resourceType={resourceType}
            regionId={regionId}
            initialReviewsCount={initialReviewsCount}
            placeholderText={placeholderText}
            sortingType={sortingType}
          />
        </SortingOptionsProvider>
      </FilterProvider>
    </LoginCtaModalProvider>
  )
}

const REVIEW_INFINITY_LIST_TYPES = {
  recommendation: PopularReviewsInfinite,
  latest: LatestReviewsInfinite,
  'star-rating-desc': RatingReviewsInfinite,
  'star-rating-asc': RatingReviewsInfinite,
}

function ReviewsComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
  sortingType,
}: Omit<ReviewsProps, 'initialRecentTrip' | 'initialSortingOption'>) {
  const { isRecentTrip, isMediaCollection } = useReviewFilters()
  const { selectedOption } = useReviewSortingOptions()

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

  const ListElement = REVIEW_INFINITY_LIST_TYPES[
    selectedOption
  ] as ComponentType<{ value: InfinityReviewValue }>

  const isRatingOption = selectedOption.startsWith('star-rating')
  const value = {
    resourceId,
    resourceType,
    regionId,
    recentTrip: isRecentTrip,
    hasMedia: isMediaCollection,
    placeholderText,
    reviewsCount: reviewsCountData?.reviewsCount,
    sortingType,
    ...(isRatingOption && { sortingLabel: selectedOption }),
  }

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

      <OptionContainer>
        <SortingOptions />

        <Filters />
      </OptionContainer>

      <ListElement value={value} />
    </Section>
  )
}
