import {
  useEffect,
  useState,
  useCallback,
  SyntheticEvent,
  useMemo,
} from 'react'
import styled from 'styled-components'
import {
  FlexBox,
  Section,
  Container,
  Text,
  Button,
  Spinner,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import {
  useEventTrackingContext,
  useSessionAvailability,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { TransitionType, withLoginCtaModal } from '@titicaca/modals'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'

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
import { useClientActions, useReviews } from './hooks'
import MyReviewActionSheet from './my-review-action-sheet'
import RecentCheckBox from './recent-checkbox'

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

const SpinnerContainer = styled(Container)`
  .-triple-fallback-action {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    background: var(--color-white);
  }
`

function ReviewContainer({
  reviewsCount: initialReviewsCount,
  recentTrip: initialRecentTrip = false,
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
  recentTrip?: boolean
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
  onReviewWrite?: (e?: SyntheticEvent, rating?: number) => void
  onReviewDelete?: ReviewDeleteHandler
  onFullListButtonClick?: (e: SyntheticEvent, sortingOption?: string) => void
}) {
  const sessionAvailable = useSessionAvailability()

  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [recentTrip, setRecentTrip] = useState(initialRecentTrip)
  const [sortingOption, setSortingOption] = useState(initialSortingOption)
  const app = useTripleClientMetadata()
  const { trackEvent } = useEventTrackingContext()
  const [[myReview, myReviewIds], setMyReviewStatus] = useState<
    [ReviewData | undefined, Set<string>]
  >([undefined, new Set([])])
  const [reviewsCount, setReviewsCount] = useState<number>(initialReviewsCount)
  const [reviewRateDescriptions, setReviewRateDescriptions] = useState<
    string[]
  >([])
  const { writeReview, editReview, navigateReviewList, navigateMileageIntro } =
    useClientActions()
  const latestReview = useMemo(
    () => !!(sortingOption === 'latest'),
    [sortingOption],
  )

  const {
    reviewCountData,
    myReviewData,
    descriptionsData,
    latestReviewsData,
    popularReviewsData,
    isLoading,
    moreFetcher,
  } = useReviews({
    resourceId,
    resourceType,
    recentTrip,
    latestReview,
    perPage: shortened
      ? SHORTENED_REVIEWS_COUNT_PER_PAGE + 1
      : DEFAULT_REVIEWS_COUNT_PER_PAGE,
  })

  const setMyReview = useCallback(
    (review) =>
      setMyReviewStatus(([, ids]) => [
        review,
        review ? new Set<string>([String(review.id), ...ids]) : ids,
      ]),
    [setMyReviewStatus],
  )

  useEffect(() => {
    const data = latestReview
      ? latestReviewsData?.pages.reduce(
          (reviews: ReviewData[], { latestReviews }) => [
            ...reviews,
            ...latestReviews,
          ],
          [],
        )
      : popularReviewsData?.pages.reduce(
          (reviews: ReviewData[], { popularReviews }) => [
            ...reviews,
            ...popularReviews,
          ],
          [],
        )

    setReviews(data || [])
  }, [latestReview, latestReviewsData?.pages, popularReviewsData?.pages])

  useEffect(() => {
    if (descriptionsData) {
      setReviewRateDescriptions(
        descriptionsData.reviewsSpecification?.rating?.description || [],
      )
    }
  }, [descriptionsData])

  useEffect(() => {
    const refreshMyReview = async (params?: { id: string }) => {
      if (!params) {
        return
      }

      const { id } = params

      if (id && id === resourceId) {
        if (reviewCountData) {
          setReviewsCount(reviewCountData.reviewsCount)
        }

        if (myReviewData) {
          setMyReview(myReviewData.myReview)
        }
      }
    }

    refreshMyReview({ id: resourceId })

    app &&
      subscribeReviewUpdateEvent &&
      subscribeReviewUpdateEvent(refreshMyReview)

    return () => {
      app &&
        unsubscribeReviewUpdateEvent &&
        unsubscribeReviewUpdateEvent(refreshMyReview)
    }
  }, [
    app,
    reviewCountData,
    myReviewData,
    resourceId,
    resourceType,
    sessionAvailable,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  const handleWriteButtonClick = useAppCallback(
    TransitionType.ReviewWrite,
    useSessionCallback(
      useCallback(
        (e: SyntheticEvent, rating = 0) => {
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
        (e: SyntheticEvent) => {
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
            recentTrip,
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

  const handleChangeRecentTrip = useCallback(
    () => setRecentTrip((prevState) => !prevState),
    [],
  )

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

      <FlexBox flex justifyContent="space-between" margin={{ top: 23 }}>
        <SortingOptions
          selected={sortingOption}
          onSelect={handleSortingOptionSelect}
        />
        <RecentCheckBox
          isRecentReview={recentTrip}
          onRecentReviewChange={handleChangeRecentTrip}
        />
      </FlexBox>

      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          {reviews.length > 0 ? (
            <ReviewsList
              maxLength={
                shortened ? SHORTENED_REVIEWS_COUNT_PER_PAGE : undefined
              }
              recentTrip={recentTrip}
              myReview={myReview}
              reviews={
                recentTrip
                  ? reviews
                  : reviews.filter((review) => !myReviewIds.has(review.id))
              }
              regionId={regionId}
              resourceId={resourceId}
              showToast={showToast}
              reviewRateDescriptions={reviewRateDescriptions}
              fetchNext={!shortened ? moreFetcher : undefined}
            />
          ) : (
            <ReviewsPlaceholder
              recentTrip={recentTrip}
              placeholderText={placeholderText}
              resourceType={resourceType}
              onClick={
                recentTrip
                  ? handleFullListButtonClick
                  : onReviewWrite || handleWriteButtonClick
              }
            />
          )}

          {(recentTrip ? reviews.length : reviewsCount) >
            SHORTENED_REVIEWS_COUNT_PER_PAGE && shortened ? (
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
                {(recentTrip ? reviews.length : reviewsCount) -
                  SHORTENED_REVIEWS_COUNT_PER_PAGE}
                개 리뷰 더보기
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
                if (app) {
                  navigateMileageIntro()
                } else {
                  window.location.href = `/pages/mileage-intro.html`
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
        </>
      )}

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

export default withLoginCtaModal(ReviewContainer)
