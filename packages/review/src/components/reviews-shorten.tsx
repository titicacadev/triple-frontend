import { FlexBox, Section, Text } from '@titicaca/core-elements'
import { LoginCtaModalProvider } from '@titicaca/modals'
import { useTranslation } from '@titicaca/next-i18next'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { formatNumber } from '@titicaca/view-utilities'
import { useEffect, useState } from 'react'

import { useReviewCount } from '../services'

import { LatestReviews } from './latest-reviews'
import { PopularReviews } from './popular-reviews'
import { WriteButton } from './write-button'
import { FilterProvider, useReviewFilters } from './filter-context'
import { SortingOption } from './sorting-context'
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
  placeholderText?: string
  isMorePage?: boolean
}

export function ReviewsShorten({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip = false,
  initialSortingOption = '',
  placeholderText,
}: ReviewsShortenProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider initialRecentTripFilter={initialRecentTrip}>
        <ReviewsShortenComponent
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
          initialReviewsCount={initialReviewsCount}
          initialSortingOption={initialSortingOption}
          placeholderText={placeholderText}
        />
      </FilterProvider>
    </LoginCtaModalProvider>
  )
}

function ReviewsShortenComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialSortingOption = '',
  placeholderText,
}: Omit<ReviewsShortenProps, 'initialRecentTrip'>) {
  const { isRecentTrip } = useReviewFilters()
  const { t } = useTranslation('common-web')

  const [sortingOption, setSortingOption] = useState(initialSortingOption)

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useTripleClientActions()
  const { trackEvent } = useEventTrackingContext()

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

  const handleSortingOptionSelect = (sortingOption: SortingOption) => {
    const eventLabel = sortingOption === 'latest' ? '최신순' : '추천순'

    trackEvent({
      ga: ['리뷰_리뷰정렬', eventLabel],
      fa: {
        action: '리뷰_리뷰정렬',
        sort_order: eventLabel,
        item_id: resourceId,
        ...(isRecentTrip && { filter_name: '최근여행' }),
      },
    })

    setSortingOption(sortingOption)
  }

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
        <SortingOptions
          selected={sortingOption}
          onSelect={handleSortingOptionSelect}
        />

        <Filters />
      </FlexBox>

      {sortingOption === '' ? (
        <PopularReviews
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
          recentTrip={isRecentTrip}
          placeholderText={placeholderText}
          reviewsCount={reviewsCountData?.reviewsCount}
        />
      ) : (
        <LatestReviews
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
