import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import { FlexBox, Section, Container, Text } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { withLoginCtaModal } from '@titicaca/modals'

import { useReviewCount } from '../services'

import { SortingOption } from './types'
import SortingOptions from './sorting-options'
import RecentCheckBox from './recent-checkbox'
import { LatestReviews } from './latest-reviews'
import { PopularReviews } from './popular-reviews'
import { WriteButton } from './write-button'

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

function ReviewsShortenComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip = false,
  initialSortingOption = '',
  placeholderText,
}: ReviewsShortenProps) {
  const { t } = useTranslation('common-web')

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
        <WriteButton
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
        />

        <>
          <Text bold size="huge" color="gray" alpha={1} inline>
            {t(['ribyu', '리뷰'])}
          </Text>
          {(reviewsCountData?.reviewsCount ?? 0) > 0 ? (
            <Text bold size="huge" color="blue" alpha={1} inline>
              {` ${formatNumber(reviewsCountData?.reviewsCount)}`}
            </Text>
          ) : null}
        </>
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

export const ReviewsShorten = withLoginCtaModal(ReviewsShortenComponent)
