import {
  useEffect,
  useState,
  useCallback,
  SyntheticEvent,
  useMemo,
  MouseEvent,
} from 'react'
import { useTranslation, Trans } from '@titicaca/next-i18next'
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

import {
  useClientActions,
  useDescriptions,
  useReviews,
  useMyReview,
  useReviewCount,
} from '../services'

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
  top: 50%;
  transform: translateY(-50%);

  @media only screen and (max-width: 640px) {
    right: 9px;
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
  isMorePage = false,
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
  isMorePage?: boolean
  /**
   * @deprecated 리뷰 작성 함수를 자체 구현하면
   * 다양한 방어 로직을 중복 구현하게 됩니다.
   * 이 prop을 사용하지 말아주세요.
   */
  onReviewWrite?: (e?: SyntheticEvent, rating?: number) => void
  onReviewDelete?: ReviewDeleteHandler
  onFullListButtonClick?: (e: SyntheticEvent, sortingOption?: string) => void
}) {
  const { t } = useTranslation('common-web')

  const sessionAvailable = useSessionAvailability()

  const [isRecentTrip, setIsRecentTrip] = useState(initialRecentTrip)
  const [sortingOption, setSortingOption] = useState(initialSortingOption)
  const app = useTripleClientMetadata()
  const { trackEvent } = useEventTrackingContext()
  const [[myReview, myReviewIds], setMyReviewStatus] = useState<
    [ReviewData | undefined, Set<string>]
  >([undefined, new Set([])])
  const [totalReviewsCount, setTotalReviewsCount] =
    useState<number>(initialReviewsCount)
  const { writeReview, editReview, navigateReviewList, navigateMileageIntro } =
    useClientActions()
  const latestReview = useMemo(
    () => !!(sortingOption === 'latest'),
    [sortingOption],
  )

  const { reviewsData, isLoaded, moreFetcher } = useReviews({
    resourceId,
    resourceType,
    recentTrip: isRecentTrip,
    latestReview,
    perPage: shortened
      ? SHORTENED_REVIEWS_COUNT_PER_PAGE + 1
      : DEFAULT_REVIEWS_COUNT_PER_PAGE,
  })
  const descriptionsData = useDescriptions({ resourceId, resourceType })
  const myReviewData = useMyReview({ resourceId, resourceType })
  const reviewsCountData = useReviewCount({
    resourceId,
    resourceType,
    recentTrip: isRecentTrip,
  })

  const setMyReview = useCallback(
    (review: ReviewData | undefined) =>
      setMyReviewStatus(([, ids]) => [
        review,
        review ? new Set<string>([String(review.id), ...Array.from(ids)]) : ids,
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
        if (reviewsCountData) {
          setTotalReviewsCount(reviewsCountData.reviewsCount)
        }

        if (myReviewData) {
          setMyReview(myReviewData.myReview as unknown as ReviewData) // TODO
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
    reviewsCountData,
    myReviewData,
    resourceId,
    resourceType,
    sessionAvailable,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
    setMyReview,
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
      { triggeredEventAction: '리뷰_리뷰쓰기' },
    ),
  )

  const trackEventOnFullListButtonClick = () => {
    trackEvent({
      ga: ['리뷰_리스트더보기_선택'],
      fa: {
        action: '리뷰_리스트더보기_선택',
        item_id: resourceId,
        tab_name: latestReview ? '최신순' : '추천순',
      },
    })
  }

  const fullListButtonClickCallback = useAppCallback(
    TransitionType.OpenReviewList,
    useSessionCallback(
      useCallback(
        (e: SyntheticEvent) => {
          e.stopPropagation()

          navigateReviewList(
            isRecentTrip === true &&
              isMorePage === false &&
              reviewsData.length === 0
              ? {
                  resourceId,
                  resourceType,
                  recentTrip: false,
                  sortingOption: '',
                }
              : {
                  regionId,
                  resourceId,
                  resourceType,
                  recentTrip: isRecentTrip,
                  sortingOption,
                },
          )
        },
        [
          resourceId,
          navigateReviewList,
          isRecentTrip,
          isMorePage,
          reviewsData.length,
          resourceType,
          regionId,
          sortingOption,
        ],
      ),
      { triggeredEventAction: '리뷰_리스트더보기_선택' },
    ),
  )

  const handleFullListButtonClick = (e: SyntheticEvent) => {
    trackEventOnFullListButtonClick()
    fullListButtonClickCallback(e)
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

  const numOfRestReviews = totalReviewsCount - SHORTENED_REVIEWS_COUNT_PER_PAGE

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
              {t(['ribyu', '리뷰'])}
            </Text>
            {(totalReviewsCount || 0) > 0 ? (
              <Text bold size="huge" color="blue" alpha={1} inline>
                {` ${formatNumber(totalReviewsCount)}`}
              </Text>
            ) : null}
          </>
        ) : (
          <Trans
            i18nKey={[
              'totalreviewscount-gaeyi-ribyu',
              '<0> {{totalReviewsCount}}</0><1>개의 리뷰</1>',
            ]}
            ns="common-web"
          >
            <Text bold size="huge" color="blue" alpha={1} inline>
              <>{{ totalReviewsCount: formatNumber(totalReviewsCount) }}</>
            </Text>
            <Text bold size="huge" color="gray" alpha={1} inline />
          </Trans>
        )}
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

      {isLoaded ? (
        <>
          {totalReviewsCount > 0 ? (
            <ReviewsList
              maxLength={
                shortened ? SHORTENED_REVIEWS_COUNT_PER_PAGE : undefined
              }
              recentTrip={isRecentTrip}
              myReview={myReview}
              reviews={
                isRecentTrip
                  ? reviewsData
                  : reviewsData.filter((review) => !myReviewIds.has(review.id))
              }
              regionId={regionId}
              resourceId={resourceId}
              showToast={showToast}
              reviewRateDescriptions={descriptionsData}
              isMorePage={isMorePage}
              fetchNext={!shortened ? moreFetcher : undefined}
            />
          ) : (
            <ReviewsPlaceholder
              recentTrip={isRecentTrip}
              placeholderText={placeholderText}
              resourceType={resourceType}
              hasReviews={!!(totalReviewsCount > 0)}
              isMorePage={isMorePage}
              onClick={
                isRecentTrip
                  ? handleFullListButtonClick
                  : onReviewWrite || handleWriteButtonClick
              }
            />
          )}

          {totalReviewsCount > SHORTENED_REVIEWS_COUNT_PER_PAGE && shortened ? (
            <Container
              css={{
                margin: '40px 0 0',
              }}
            >
              <Button
                basic
                fluid
                compact
                size="small"
                onClick={
                  onFullListButtonClick
                    ? (e: MouseEvent<HTMLButtonElement>) =>
                        onFullListButtonClick(e, sortingOption)
                    : handleFullListButtonClick
                }
              >
                {t(
                  [
                    'numofrestreviews-gae-ribyu-deobogi',
                    '{{numOfRestReviews}}개 리뷰 더보기',
                  ],
                  { numOfRestReviews },
                )}
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
                {t([
                  'ribyu-sseumyeon-yeohaengja-keulreob-coedae-3pointeu',
                  '리뷰 쓰면 여행자 클럽 최대 3포인트!',
                ])}
              </Text>
              <Text color="blue" size="small" lineHeight={1.7}>
                {t(['pointeubyeol-hyetaeg-bogi', '포인트별 혜택 보기'])}
              </Text>
              <BulletRight
                alt={t(['pointeubyeol-hyetaeg-bogi', '포인트별 혜택 보기'])}
              />
            </MileageButton>
          ) : null}
        </>
      ) : (
        <Spinner />
      )}

      {myReview ? (
        <MyReviewActionSheet
          myReview={myReview}
          resourceType={resourceType}
          resourceId={resourceId}
          notifyReviewDeleted={(resourceId, reviewId) => {
            reviewId === myReview.id && setMyReview(undefined)
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
