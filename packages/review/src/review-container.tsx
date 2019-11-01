import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Section, Container, Text, Button } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import {
  useUserAgentContext,
  useHistoryContext,
} from '@titicaca/react-contexts'
import { TransitionType, useTransitionModal } from '@titicaca/modals'
import {
  fetchMyReview,
  writeReview,
  fetchReviewsCount,
} from './review-api-clients'
import ReviewsPlaceholder from './review-placeholder-with-rating'
import ReviewsList from './reviews-list'
import { ReviewProps } from './types'
import SortingOptions, { DEFAULT_SORTING_OPTION } from './sorting-options'
import usePaging from './use-paging'
import MyReviewActionSheet from './my-review-action-sheet'

const REVIEWS_SECTION_ID = 'reviews'

const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`

export default function ReviewContainer({
  reviewsCount: initialReviewsCount,
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
  sortingOption: initialSortingOption = DEFAULT_SORTING_OPTION,
  onReviewWrite,
  onFullListButtonClick,
}: ReviewProps) {
  const [sortingOption, setSortingOption] = useState(initialSortingOption)
  const { isPublic } = useUserAgentContext()
  const [myReview, setMyReview] = useState(undefined)
  const [reviewsCount, setReviewsCount] = useState(initialReviewsCount)
  const { navigate } = useHistoryContext()
  const { show } = useTransitionModal()

  useEffect(() => {
    const refreshMyReview = async (params?: { id: string }) => {
      if (!params) {
        return
      }

      const { id } = params

      if (id && id === resourceId) {
        const [fetchedMyReview, fetchedReviewsCount] = await Promise.all([
          fetchMyReview({ resourceType, resourceId }),
          fetchReviewsCount({ resourceType, resourceId }),
        ])

        setMyReview(fetchedMyReview)
        setReviewsCount(fetchedReviewsCount)
      }
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
      return show(TransitionType.ReviewWrite)
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
      return show(TransitionType.Review)
    }

    navigate(
      `${appUrlScheme}:///inlink?path=${encodeURIComponent(
        `/reviews/list?_triple_no_navbar&region_id=${regionId}&resource_id=${resourceId}&resource_type=${resourceType}&sorting_option=${sortingOption}`,
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
        {shortened ? (
          <WriteIcon
            src="https://assets.triple.guide/images/btn-com-write@2x.png"
            onClick={onReviewWrite || handleWriteButtonClick}
          />
        ) : null}

        {shortened ? (
          <>
            <Text bold size="huge" color="gray" alpha={1} inline>
              리뷰
            </Text>
            {(reviewsCount || 0) > 0 ? (
              <Text bold size="huge" color="blue" alpha={1} inline>
                {` ${formatNumber(reviewsCount)}`}
              </Text>
            ) : null}
          </>
        ) : (
          <>
            <Text bold size="huge" color="blue" alpha={1} inline>
              {` ${formatNumber(reviewsCount)}`}
            </Text>
            <Text bold size="huge" color="gray" alpha={1} inline>
              개의 리뷰
            </Text>
          </>
        )}
      </Container>

      {(reviewsCount || 0) > 0 || myReview ? (
        <>
          <Container margin={{ top: 23 }} clearing>
            <SortingOptions
              selected={sortingOption}
              onSelect={handleSortingOptionSelect}
            />
          </Container>

          <ReviewsList
            maxLength={shortened ? 3 : null}
            myReview={myReview}
            reviews={reviews}
            resourceType={resourceType}
            regionId={regionId}
            appUrlScheme={appUrlScheme}
            margin={{ top: 30 }}
            resourceId={resourceId}
            showToast={showToast}
            fetchNext={!shortened && fetchNext}
          />
        </>
      ) : (
        <ReviewsPlaceholder
          resourceType={resourceType}
          onClick={onReviewWrite || handleWriteButtonClick}
        />
      )}

      {reviewsCount > 3 && shortened ? (
        <Container margin={{ top: 50 }}>
          <Button
            basic
            fluid
            compact
            size="small"
            onClick={
              onFullListButtonClick
                ? (e) => onFullListButtonClick(e, sortingOption)
                : handleFullListButtonClick
            }
          >
            {reviewsCount - 3}개 리뷰 더보기
          </Button>
        </Container>
      ) : null}

      <MyReviewActionSheet
        myReview={myReview}
        appUrlScheme={appUrlScheme}
        regionId={regionId}
        resourceType={resourceType}
        resourceId={resourceId}
        notifyReviewDeleted={(resourceId, reviewId) => {
          myReview && reviewId === myReview.id && setMyReview(null)
          notifyReviewDeleted(resourceId, reviewId)
        }}
      />
    </Section>
  )
}
