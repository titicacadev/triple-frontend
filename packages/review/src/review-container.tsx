import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Section, Container, Text, Button } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import {
  useUserAgentContext,
  useEventTrackingContext,
  useSessionAvailability,
} from '@titicaca/react-contexts'
import { TransitionType, withLoginCTAModal } from '@titicaca/modals'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'

import {
  fetchMyReview,
  fetchReviewsCount,
  fetchReviewRateDescription,
} from './review-api-clients'
import ReviewsPlaceholder from './review-placeholder-with-rating'
import ReviewsList from './reviews-list'
import {
  ReviewData,
  AppNativeActionProps,
  ResourceType,
  ReviewDeleteHandler,
} from './types'
import SortingOptions, {
  DEFAULT_SORTING_OPTION,
  ORDER_BY_RECENCY,
  SortingOptionsProps,
} from './sorting-options'
import usePaging from './use-paging'
import MyReviewActionSheet from './my-review-action-sheet'
import { useClientActions } from './use-client-actions'

const REVIEWS_SECTION_ID = 'reviews'
const DEFAULT_REVIEWS_COUNT_PER_PAGE = 20
const SHORTENED_REVIEWS_COUNT_PER_PAGE = 4

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
  padding: 22px 20px 19px;
  font-size: 13px;
  color: #2987f0;
  cursor: pointer;

  @media only screen and (max-width: 640px) {
    padding: 16px 14px 16px 20px;
  }
`

const BulletRight = styled.img.attrs({
  src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMjk4N0YwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS42IiBkPSJNNy4wNyAxNkwxMyAxMC4wMzUgNyA0Ii8+Cjwvc3ZnPgo=',
})`
  position: absolute;
  right: 20px;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
  @media only screen and (max-width: 640px) {
    right: 9px;
  }
`

function ReviewContainer({
  reviewsCount: initialReviewsCount,
  resourceType,
  regionId,
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
}: {
  resourceId: string
  resourceType: ResourceType
  regionId?: string
  reviewsCount: number
  shortened?: boolean
  reviewed?: boolean
  deepLink?: string
  placeholderText?: string
  appNativeActions: AppNativeActionProps
  sortingOption?: string
  /**
   * @deprecated 리뷰 작성 함수를 자체 구현하면
   * 다양한 방어 로직을 중복 구현하게 됩니다.
   * 이 prop을 사용하지 말아주세요.
   */
  onReviewWrite?: (e?: React.SyntheticEvent, rating?: number) => void
  onReviewDelete?: ReviewDeleteHandler
  onFullListButtonClick?: (
    e: React.SyntheticEvent,
    sortingOption?: string,
  ) => void
}) {
  const sessionAvailable = useSessionAvailability()

  const [sortingOption, setSortingOption] = useState(initialSortingOption)
  const { isPublic } = useUserAgentContext()
  const { trackEvent } = useEventTrackingContext()
  const [[myReview, myReviewIds], setMyReviewStatus] = useState<
    [ReviewData | undefined, Set<string>]
  >([undefined, new Set([])])
  const [reviewsCount, setReviewsCount] = useState(initialReviewsCount)
  const [reviewRateDescriptions, setReviewRateDescriptions] = useState<
    string[]
  >([])
  const { writeReview, editReview, navigateReviewList, navigateMileageIntro } =
    useClientActions()

  const setMyReview = useCallback(
    (review) =>
      setMyReviewStatus(([, ids]) => [
        review,
        review ? new Set<string>([String(review.id), ...ids]) : ids,
      ]),
    [setMyReviewStatus],
  )

  useEffect(() => {
    if (resourceType !== 'article') {
      const fetchReviewDescription = async () => {
        setReviewRateDescriptions(
          await fetchReviewRateDescription({ resourceType, resourceId }),
        )
      }

      fetchReviewDescription()
    }
  }, [resourceId, resourceType])

  useEffect(() => {
    const refreshMyReview = async (params?: { id: string }) => {
      if (!params) {
        return
      }

      const { id } = params

      if (id && id === resourceId) {
        const [fetchedReviewsCount, fetchedMyReview] = await Promise.all([
          fetchReviewsCount({ resourceType, resourceId }),
          sessionAvailable === true
            ? fetchMyReview({ resourceType, resourceId })
            : Promise.resolve(null),
        ])

        if (fetchedMyReview) {
          setMyReview(fetchedMyReview)
        }

        if (fetchedReviewsCount !== null) {
          setReviewsCount(fetchedReviewsCount)
        }
      }
    }

    refreshMyReview({ id: resourceId })

    !isPublic &&
      subscribeReviewUpdateEvent &&
      subscribeReviewUpdateEvent(refreshMyReview)

    return () => {
      !isPublic &&
        unsubscribeReviewUpdateEvent &&
        unsubscribeReviewUpdateEvent(refreshMyReview)
    }
  }, [
    isPublic,
    resourceId,
    resourceType,
    sessionAvailable,
    setMyReview,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  const handleWriteButtonClick = useAppCallback(
    TransitionType.ReviewWrite,
    useSessionCallback(
      useCallback(
        (e: React.SyntheticEvent, rating = 0) => {
          e.stopPropagation()

          trackEvent({
            ga: ['리뷰_리뷰쓰기'],
            fa: {
              action: '리뷰_리뷰쓰기',
              item_id: resourceId,
            },
          })

          writeReview({
            resourceType,
            resourceId,
            regionId,
            rating,
          })
        },
        [trackEvent, resourceId, writeReview, resourceType, regionId],
      ),
    ),
  )

  const handleFullListButtonClick = useAppCallback(
    TransitionType.Review,
    useSessionCallback(
      useCallback(
        (e: React.SyntheticEvent) => {
          trackEvent({
            ga: ['리뷰_전체보기'],
            fa: {
              action: '리뷰_전체보기',
              item_id: resourceId,
            },
          })

          e.stopPropagation()

          navigateReviewList({
            regionId,
            resourceId,
            resourceType,
            sortingOption,
          })
        },
        [
          trackEvent,
          resourceId,
          navigateReviewList,
          regionId,
          resourceType,
          sortingOption,
        ],
      ),
    ),
  )

  const handleSortingOptionSelect: SortingOptionsProps['onSelect'] = (
    _,
    sortingOption,
  ) => {
    const eventLabel = sortingOption === ORDER_BY_RECENCY ? '최신순' : '추천순'
    trackEvent({
      ga: ['리뷰_리뷰정렬', eventLabel],
      fa: {
        action: '리뷰_리뷰정렬',
        sort_order: eventLabel,
        item_id: resourceId,
      },
    })

    setSortingOption(sortingOption)
  }

  const { reviews, fetchNext } = usePaging({
    sortingOption,
    resourceId,
    resourceType,
    perPage: shortened
      ? SHORTENED_REVIEWS_COUNT_PER_PAGE + 1
      : DEFAULT_REVIEWS_COUNT_PER_PAGE,
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
            maxLength={shortened ? SHORTENED_REVIEWS_COUNT_PER_PAGE : undefined}
            myReview={myReview}
            reviews={reviews.filter((review) => !myReviewIds.has(review.id))}
            regionId={regionId}
            resourceId={resourceId}
            showToast={showToast}
            reviewRateDescriptions={reviewRateDescriptions}
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

      {reviewsCount > SHORTENED_REVIEWS_COUNT_PER_PAGE && shortened ? (
        <Container margin={{ top: 40 }}>
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
            {reviewsCount - SHORTENED_REVIEWS_COUNT_PER_PAGE}개 리뷰 더보기
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
                item_id: resourceId,
              },
            })
            e.preventDefault()
            if (isPublic) {
              window.location.href = `/pages/mileage-intro.html`
            } else {
              navigateMileageIntro()
            }
          }}
        >
          <Text color="gray" size="small" alpha={0.6} lineHeight={1.7}>
            리뷰 쓰면 여행자 클럽 최대 3포인트!
          </Text>
          <Text color="blue" size="small" lineHeight={1.7}>
            포인트별 혜택 보기
          </Text>
          <BulletRight alt="포인트별 혜택 보기" />
        </MileageButton>
      ) : null}

      {myReview ? (
        <MyReviewActionSheet
          myReview={myReview}
          resourceType={resourceType}
          resourceId={resourceId}
          notifyReviewDeleted={(resourceId, reviewId) => {
            reviewId === myReview.id && setMyReview(null)
            notifyReviewDeleted(resourceId, reviewId)
          }}
          onReviewEdit={() => {
            if (onReviewWrite) {
              onReviewWrite()
              return
            }

            editReview({ regionId, resourceId, resourceType })
          }}
          onReviewDelete={onReviewDelete}
        />
      ) : null}
    </Section>
  )
}

export default withLoginCTAModal(ReviewContainer)
