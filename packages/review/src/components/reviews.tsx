import { useEffect, useState, useCallback } from 'react'
import { Trans } from '@titicaca/next-i18next'
import { FlexBox, Section, Container, Text } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { withLoginCtaModal } from '@titicaca/modals'

import { useReviewCount } from '../services'

import { SortingOption } from './types'
import SortingOptions from './sorting-options'
import RecentCheckBox from './recent-checkbox'
import { PopularReviewsInfinite } from './popular-reviews-infinite'
import { LatestReviewsInfinite } from './latest-reviews-infinite'

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

function ReviewsComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip = false,
  initialSortingOption = '',
  placeholderText,
}: ReviewsProps) {
  const [isRecentTrip, setIsRecentTrip] = useState(initialRecentTrip)
  const [sortingOption, setSortingOption] = useState(initialSortingOption)

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useTripleClientActions()
  const { trackEvent } = useEventTrackingContext()

  const { data: reviewsCountData, refetch: refetchReviewsCount } =
    useReviewCount(
      {
        resourceId,
        resourceType,
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

  const handleRecentTripChange = useCallback(() => {
    setIsRecentTrip((prevState) => !prevState)

    const action = isRecentTrip ? '리뷰_최근여행_해제' : '리뷰_최근여행_선택'
    trackEvent({
      ga: [action],
      fa: {
        action,
      },
    })
  }, [isRecentTrip, trackEvent])

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
        <RecentCheckBox
          isRecentReview={isRecentTrip}
          onRecentReviewChange={handleRecentTripChange}
        />
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

export const Reviews = withLoginCtaModal(ReviewsComponent)
