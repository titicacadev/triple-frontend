import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Section, Container, Text, Button } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import {
  useUserAgentContext,
  useHistoryContext,
  useEventTrackingContext,
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
import SortingOptions, {
  DEFAULT_SORTING_OPTION,
  ORDER_BY_RECENCY,
  SortingOptionsProps,
} from './sorting-options'
import usePaging from './use-paging'
import MyReviewActionSheet from './my-review-action-sheet'

const REVIEWS_SECTION_ID = 'reviews'

const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`

const MileageButton = styled.div`
  position: relative;
  box-sizing: border-box;
  display: block;
  border-radius: 4px;
  background-color: rgba(58, 58, 58, 0.03);
  width: 100%;
  margin-top: 25px;
  padding: 25px 20px 22px;
  font-size: 13px;
  color: #2987f0;
  cursor: pointer;

  @media only screen and (max-width: 640px) {
    padding: 19px 20px 19px;
  }
`

const BulletRight = styled.img.attrs({
  src:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMjk4N0YwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS42IiBkPSJNNy4wNyAxNkwxMyAxMC4wMzUgNyA0Ii8+Cjwvc3ZnPgo=',
})`
  position: absolute;
  right: 20px;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  @media only screen and (max-width: 640px) {
    right: 15px;
  }
`

export default function ReviewContainer({
  reviewsCount: initialReviewsCount,
  resourceType,
  regionId,
  appUrlScheme,
  resourceId,
  placeholderText,
  appNativeActions: {
    notifyReviewDeleted,
    showToast,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  },
  shortened,
  sortingOption: initialSortingOption = DEFAULT_SORTING_OPTION,
  onReviewWrite,
  onReviewDelete,
  onFullListButtonClick,
}: ReviewProps) {
  const [sortingOption, setSortingOption] = useState(initialSortingOption)
  const { isPublic } = useUserAgentContext()
  const { trackEvent } = useEventTrackingContext()
  const [[myReview, myReviewIds], setMyReviewStatus] = useState<
    [any, Set<string>]
  >([undefined, new Set([])])
  const [reviewsCount, setReviewsCount] = useState(initialReviewsCount)
  const { navigate } = useHistoryContext()
  const { show } = useTransitionModal()

  const setMyReview = useCallback(
    (review) =>
      setMyReviewStatus(([, ids]) => [
        review,
        review ? new Set<string>([String(review.id), ...ids]) : ids,
      ]),
    [setMyReviewStatus],
  )

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
    trackEvent({
      ga: ['리뷰_리뷰쓰기'],
      fa: {
        action: '리뷰_리뷰쓰기',
        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
      },
    })
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
    trackEvent({
      ga: ['리뷰_전체보기'],
      fa: {
        action: '리뷰_전체보기',
        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
      },
    })

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

  const handleSortingOptionSelect: SortingOptionsProps['onSelect'] = (
    _,
    sortingOption,
  ) => {
    const eventLabel = sortingOption === ORDER_BY_RECENCY ? '최신순' : '추천순'
    trackEvent({
      ga: ['리뷰_리뷰정렬', eventLabel],
      fa: {
        action: '리뷰_리뷰정렬',
        sort_order: eventLabel, // eslint-disable-line @typescript-eslint/camelcase
        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
      },
    })

    setSortingOption(sortingOption)
  }

  const { reviews, fetchNext } = usePaging({
    sortingOption,
    resourceId,
    resourceType,
    perPage: shortened ? 4 : 20,
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
            maxLength={shortened ? 3 : undefined}
            myReview={myReview}
            reviews={reviews.filter((review) => !myReviewIds.has(review.id))}
            resourceType={resourceType}
            regionId={regionId}
            appUrlScheme={appUrlScheme}
            margin={{ top: 30 }}
            resourceId={resourceId}
            showToast={showToast}
            fetchNext={!shortened ? fetchNext : undefined}
          />
        </>
      ) : (
        <ReviewsPlaceholder
          placeholderText={placeholderText}
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

      {shortened ? (
        <MileageButton
          onClick={(e) => {
            trackEvent({
              ga: ['리뷰_여행자클럽선택'],
              fa: {
                action: '리뷰_여행자클럽선택',
                item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
              },
            })
            e.preventDefault()
            if (isPublic) window.location.href = `/pages/mileage-intro.html`
            else navigate(`${appUrlScheme}:///my/mileage/intro`)
          }}
        >
          <Text color="gray" size="small" alpha={0.6} lineHeight={1.7}>
            리뷰 쓰면 여행자 클럽 최대 3포인트!
          </Text>
          <Text color="blue" size="small" margin={{ top: 5 }} lineHeight={1.7}>
            포인트별 혜택 보기
          </Text>
          <BulletRight alt="포인트별 혜택 보기" />
        </MileageButton>
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
        onReviewEdit={() => onReviewWrite && onReviewWrite()}
        onReviewDelete={onReviewDelete}
      />
    </Section>
  )
}
