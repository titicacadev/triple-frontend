import { useEffect, useState } from 'react'
import { Trans } from '@titicaca/next-i18next'
import { FlexBox, Section, Container, Text } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { LoginCtaModalProvider } from '@titicaca/modals'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { useReviewCount } from '../services'

import { PopularReviewsInfinite } from './popular-reviews-infinite'
import { LatestReviewsInfinite } from './latest-reviews-infinite'
import { SortingOption } from './sorting-context'
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
  placeholderText,
}: ReviewsProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider initialRecentTripFilter={initialRecentTrip}>
        <ReviewsComponent
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

function ReviewsComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialSortingOption,
  placeholderText,
}: Omit<ReviewsProps, 'initialRecentTrip'>) {
  const { isRecentTrip } = useReviewFilters()
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
        <SortingOptions
          selected={sortingOption}
          onSelect={handleSortingOptionSelect}
        />

        <Filters />
      </FlexBox>

      {sortingOption === '' ? (
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
