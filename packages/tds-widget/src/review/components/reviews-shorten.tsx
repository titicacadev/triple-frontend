import { ComponentType, ReactNode, useEffect } from 'react'
import { styled } from 'styled-components'
import { FlexBox, Section, Text } from '@titicaca/tds-ui'
import { useTranslation, useClientAppActions } from '@titicaca/triple-web'
import { formatNumber } from '@titicaca/view-utilities'

import { useReviewCount } from '../services'

import { PopularReviews, LatestReviews, RatingReviews } from './shorten-list'
import { WriteButton } from './write-button'
import { FilterProvider, useReviewFilters } from './filter-context'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingOption, SortingType } from './sorting-context'
import { Filters } from './filter'
import { SortingOptions } from './sorting-options'
import type { ShortenReviewValue } from './shorten-list'

const REVIEWS_SECTION_ID = 'reviews'

type ResourceType = 'article' | 'attraction' | 'restaurant' | 'hotel' | 'tna'
interface ReviewsShortenProps {
  resourceId: string
  resourceType: ResourceType
  regionId?: string
  initialReviewsCount: number
  initialMediaFilter?: boolean
  initialRecentTrip?: boolean
  initialSortingOption?: SortingOption
  sortingType?: SortingType
  placeholderText?: string
  receiverId?: string
  banner?: ReactNode
}

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

export function ReviewsShorten({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip,
  initialMediaFilter,
  initialSortingOption = 'recommendation',
  sortingType = 'default',
  placeholderText,
  receiverId,
  banner,
}: ReviewsShortenProps) {
  return (
    <FilterProvider
      receiverId={receiverId}
      initialRecentTrip={initialRecentTrip}
      initialMediaFilter={initialMediaFilter}
    >
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
          sortingType={sortingType}
          banner={banner}
        />
      </SortingOptionsProvider>
    </FilterProvider>
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
  sortingType,
  banner,
}: Omit<ReviewsShortenProps, 'initialRecentTrip' | 'initialSortingOption'>) {
  const { isRecentTrip, isMediaCollection } = useReviewFilters()
  const { selectedOption } = useReviewSortingOptions()
  const t = useTranslation()

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useClientAppActions()

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
    // eslint-disable-next-line no-console
    console.log(
      subscribeReviewUpdateEvent
        ? 'Subscribe review update event'
        : 'No refetch function',
    )
    subscribeReviewUpdateEvent?.(refetchReviewsCount)

    return () => unsubscribeReviewUpdateEvent?.(refetchReviewsCount)
  }, [
    refetchReviewsCount,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  const ListElement = REVIEW_SHORTEN_LIST_TYPES[
    selectedOption
  ] as ComponentType<{ value: ShortenReviewValue }>
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
      <FlexBox flex alignItems="center">
        <div>
          <Text bold size="huge" color="gray" alpha={1} inline>
            {t('리뷰')}
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
      {banner}
      <OptionContainer>
        <SortingOptions />

        <Filters />
      </OptionContainer>

      <ListElement value={value} />
    </Section>
  )
}
