import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Section, Container, Text, Button, HR1 } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import {
  useUserAgentContext,
  useHistoryContext,
} from '@titicaca/react-contexts'
import { fetchMyReview, writeReview } from './review-api-clients'
import ReviewsPlaceholder from './review-placeholder-with-rating'
import ReviewsList from './reviews-list'
import { ReviewProps } from './types'
import SortingOptions, { DEFAULT_SORTING_OPTION } from './sorting-options'
import usePaging from './use-paging'
import {
  HASH_REVIEW_TRANSITION_MODAL,
  HASH_REVIEW_WRITE_TRANSITION_MODAL,
} from './transition-modals'

const REVIEWS_SECTION_ID = 'reviews'

const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`

export default function ReviewContainer({
  reviewsCount,
  resourceType,
  regionId,
  appUrlScheme,
  resourceId,
  appNativeActions: {
    notifyReviewDeleted,
    showToast,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  },
  shortened,
}: ReviewProps) {
  const [sortingOption, setSortingOption] = useState(DEFAULT_SORTING_OPTION)
  const { isPublic } = useUserAgentContext()
  const [myReview, setMyReview] = useState(undefined)
  const { navigate, push } = useHistoryContext()

  useEffect(() => {
    const refreshMyReview = async (params?: { id: string }) => {
      if (!params) {
        return
      }

      const { id } = params

      id &&
        id === resourceId &&
        setMyReview(await fetchMyReview({ resourceType, resourceId }))
    }

    refreshMyReview({ id: resourceId })

    !isPublic &&
      subscribeReviewUpdateEvent &&
      subscribeReviewUpdateEvent(refreshMyReview)

    return () =>
      !isPublic &&
      unsubscribeReviewUpdateEvent &&
      unsubscribeReviewUpdateEvent(refreshMyReview)
  }, [
    isPublic,
    resourceType,
    resourceId,
    setMyReview,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  const handleWriteButtonClick = (
    e: React.SyntheticEvent,
    rating: number = 0,
  ) => {
    e.stopPropagation()

    if (isPublic) {
      return push(HASH_REVIEW_WRITE_TRANSITION_MODAL)
    }

    writeReview({
      appUrlScheme,
      resourceType,
      resourceId,
      regionId,
      rating,
    })
  }

  const handleFullListButtonClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()

    if (isPublic) {
      return push(HASH_REVIEW_TRANSITION_MODAL)
    }

    navigate(
      `${appUrlScheme}:///inlink?url=${encodeURIComponent(
        `/reviews/all?resource_id=${resourceId}&resource_type=${resourceType}`,
      )}`,
    )
  }

  const handleSortingOptionSelect = (_, sortingOption) =>
    setSortingOption(sortingOption)

  const { reviews, fetchNext } = usePaging({
    sortingOption,
    resourceId,
    resourceType,
    perPage: shortened ? 3 : 20,
  })

  return (
    <Section anchor={REVIEWS_SECTION_ID}>
      <Container>
        <WriteIcon
          src="https://assets.triple.guide/images/btn-com-write@2x.png"
          onClick={handleWriteButtonClick}
        />
        <Text bold size="huge" color="gray" alpha={1} inline>
          리뷰
        </Text>

        {(reviewsCount || 0) > 0 ? (
          <Text bold size="huge" color="blue" alpha={1} inline>
            {` ${formatNumber(reviewsCount)}`}
          </Text>
        ) : null}
      </Container>

      {!isPublic && shortened && !myReview && (
        <>
          <ReviewsPlaceholder
            resourceType={resourceType}
            appUrlScheme={appUrlScheme}
            onClick={handleWriteButtonClick}
          />
          {(reviewsCount || 0) > 0 && (
            <HR1 compact margin={{ top: 32, bottom: 27 }} />
          )}
        </>
      )}

      {(reviewsCount || 0) > 1 ? (
        <Container margin={{ top: 23 }} clearing>
          <SortingOptions
            selected={sortingOption}
            onSelect={handleSortingOptionSelect}
          />
        </Container>
      ) : null}

      <ReviewsList
        myReview={myReview}
        reviews={reviews}
        resourceType={resourceType}
        regionId={regionId}
        appUrlScheme={appUrlScheme}
        margin={{ top: (reviewsCount || 0) > 1 ? 18 : 30 }}
        resourceId={resourceId}
        notifyReviewDeleted={(resourceId, reviewId) => {
          myReview && reviewId === myReview.id && setMyReview(null)
          notifyReviewDeleted(resourceId, reviewId)
        }}
        showToast={showToast}
        fetchNext={!shortened && fetchNext}
      />

      {reviewsCount > 3 && shortened ? (
        <Container margin={{ top: 50 }}>
          <Button
            basic
            fluid
            compact
            size="small"
            onClick={handleFullListButtonClick}
          >
            {reviewsCount - 3}개 리뷰 더보기
          </Button>
        </Container>
      ) : null}
    </Section>
  )
}
