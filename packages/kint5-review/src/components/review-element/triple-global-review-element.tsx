import {
  Container,
  FlexBox,
  List,
  Rating,
  Text,
  EmptyThumbsUpIcon,
  FilledThumbsUpIcon,
} from '@titicaca/kint5-core-elements'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { TransitionType } from '@titicaca/modals'
import { useTranslation } from '@titicaca/next-i18next'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import {
  useTripleClientActions,
  useTripleClientMetadata,
} from '@titicaca/react-triple-client-interfaces'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { formatTimestamp } from '@titicaca/view-utilities'
import moment from 'moment'
import { PropsWithChildren, useCallback, useState } from 'react'
import styled from 'styled-components'

import { BaseReviewFragment } from '../../data/graphql'
import {
  useClientActions,
  useLikeReviewMutation,
  useUnlikeReviewMutation,
} from '../../services'
import { HASH_MY_REVIEW_ACTION_SHEET } from '../my-review-action-sheet'
import { HASH_REVIEW_ACTION_SHEET } from '../others-review-action-sheet'
import { useReviewLanguage } from '../language-context'

import Comment from './comment'
import FoldableComment from './foldable-comment'
import Media from './media'
import User from './user'

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-kint5-gray100);
`

export interface TripleGlobalReviewElementProps {
  review: BaseReviewFragment
  isFullList: boolean
  isMyReview: boolean
  reviewRateDescriptions: string[] | null | undefined
  resourceId: string
  regionId?: string
  onMenuClick: (reviewId: string) => void
}

export function TripleGlobalReviewElement({
  review,
  review: {
    user,
    blinded,
    comment,
    recentTrip,
    reviewedAt: originReviewedAt,
    rating,
    media,
    visitDate,
    liked,
    likesCount,
  },
  isFullList,
  isMyReview,
  reviewRateDescriptions,
  resourceId,
  regionId,
  onMenuClick,
}: TripleGlobalReviewElementProps) {
  const { t } = useTranslation('common-web')

  const { lang } = useReviewLanguage()
  const [unfolded, setUnfolded] = useState(false)
  const { trackEvent } = useEventTrackingContext()
  const { push } = useHistoryFunctions()
  const app = useTripleClientMetadata()
  const { showToast } = useTripleClientActions()
  const { navigateReviewDetail, navigateUserDetail } = useClientActions()

  const { mutate: likeReview } = useLikeReviewMutation({ lang })
  const { mutate: unlikeReview } = useUnlikeReviewMutation({ lang })

  const likeButtonAction = `리뷰_땡쓰${liked ? '취소' : ''}_선택`

  const handleUserClick = useSessionCallback(
    useCallback(() => {
      if (!app) {
        return
      }

      if (!review.user) {
        return
      }

      const { uid, mileage, unregister } = review.user

      trackEvent({
        ga: ['리뷰 프로필'],
        fa: {
          action: '리뷰_프로필',
          item_id: resourceId,
          user_id: uid,
          review_id: review.id,
          level: mileage?.level ?? 0,
        },
      })

      if (unregister) {
        showToast?.(t(['taltoehan-sayongjaibnida.', '탈퇴한 사용자입니다.']))
      } else {
        navigateUserDetail(uid)
      }
    }, [
      app,
      review.user,
      review.id,
      trackEvent,
      resourceId,
      showToast,
      t,
      navigateUserDetail,
    ]),
  )

  const handleMenuClick = useSessionCallback(
    useCallback(() => {
      if (!app) {
        return
      }

      if (isMyReview) {
        push(HASH_MY_REVIEW_ACTION_SHEET)
      } else {
        onMenuClick?.(review.id)
        push(HASH_REVIEW_ACTION_SHEET)
      }
    }, [app, isMyReview, onMenuClick, push, review.id]),
  )

  const handleReviewClick = useAppCallback(
    TransitionType.ReviewSelect,
    useCallback(() => {
      trackEvent({
        ga: ['리뷰_리뷰내용_선택', review.id],
        fa: {
          action: '리뷰_리뷰내용_선택',
          item_id: review.id,
          resource_id: resourceId,
          ...(recentTrip && { recent_trip: '최근여행' }),
        },
      })

      navigateReviewDetail({ reviewId: review.id, regionId, resourceId })

      unfolded && setUnfolded(false)
    }, [
      unfolded,
      trackEvent,
      review.id,
      resourceId,
      recentTrip,
      navigateReviewDetail,
      regionId,
    ]),
    false,
  )

  const handleLikeButtonClick = useSessionCallback(
    useCallback(() => {
      trackEvent({
        ga: [likeButtonAction, review.id],
        fa: {
          action: likeButtonAction,
          item_id: review.id,
          resource_id: resourceId,
        },
      })

      liked
        ? unlikeReview({ reviewId: review.id, resourceId })
        : likeReview({ reviewId: review.id, resourceId })
    }, [
      likeButtonAction,
      likeReview,
      liked,
      resourceId,
      review.id,
      trackEvent,
      unlikeReview,
    ]),
    { triggeredEventAction: likeButtonAction },
  )

  const reviewedAt = moment(originReviewedAt).format()
  const reviewExposureAction = `${
    isFullList ? '리뷰_전체보기_노출' : '리뷰_노출'
  }`

  return (
    <IntersectionObserver
      onChange={({ isIntersecting }) => {
        if (isIntersecting) {
          trackEvent({
            ga: [reviewExposureAction, review.id],
            fa: {
              action: reviewExposureAction,
              item_id: review.id,
              poi_id: resourceId,
              ...(review.recentTrip && { recent_trip: '최근여행' }),
            },
          })
        }
      }}
    >
      <List.Item style={{ paddingTop: 6 }}>
        {user ? <User user={user} onClick={handleUserClick} /> : null}
        <FlexBox flex css={{ alignItems: 'center', gap: 16, marginTop: 18 }}>
          {!blinded && !!rating ? <Rating score={rating} /> : null}
          {!blinded ? <RecentReviewInfo visitDate={visitDate} /> : null}
        </FlexBox>
        <Content onClick={handleReviewClick}>
          {blinded ? (
            t([
              'singoga-jeobsudoeeo-beulraindeu-ceoridoeeossseubnida.',
              '신고가 접수되어 블라인드 처리되었습니다.',
            ])
          ) : comment ? (
            unfolded ? (
              comment
            ) : (
              <FoldableComment
                comment={comment}
                hasImage={(media || []).length > 0}
                onUnfoldButtonClick={(e) => {
                  e.stopPropagation()
                  trackEvent({
                    ga: ['리뷰_리뷰글더보기_선택'],
                    fa: {
                      action: '리뷰_리뷰글더보기_선택',
                      item_id: review.id,
                      resource_id: resourceId,
                    },
                  })
                  setUnfolded(true)
                }}
              />
            )
          ) : (
            <RateDescription
              rating={rating}
              reviewRateDescriptions={reviewRateDescriptions}
            />
          )}
        </Content>
        {!blinded && media && media.length > 0 ? (
          <Container
            css={{
              margin: '16px 0 0',
            }}
          >
            <Media allowNavigateImages media={media} reviewId={review.id} />
          </Container>
        ) : null}
        <FlexBox
          flex
          css={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          {!blinded ? (
            <LikeButton onClick={handleLikeButtonClick}>
              {liked ? <FilledThumbsUpIcon /> : <EmptyThumbsUpIcon />}
              {likesCount}
            </LikeButton>
          ) : null}

          {!blinded || (blinded && isMyReview) ? (
            <FlexBox flex css={{ alignItems: 'center', gap: 5 }}>
              <Text
                inline
                css={{
                  fontSize: 12,
                  color: 'var(--color-kint5-gray50)',
                }}
              >
                {formatTimestamp(reviewedAt)}
              </Text>
              <button onClick={handleMenuClick}>
                <img
                  src="https://assets.triple-dev.titicaca-corp.com/images/kint5-ic-dot-line-24.svg"
                  alt="Show more"
                  width={24}
                  height={24}
                />
              </button>
            </FlexBox>
          ) : null}
        </FlexBox>
      </List.Item>
    </IntersectionObserver>
  )
}

function Content({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <Container
      clearing
      css={{
        margin: '16px 0 0',
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <a onClick={onClick}>
        <Comment>{children}</Comment>
      </a>
    </Container>
  )
}

function RateDescription({
  rating,
  reviewRateDescriptions,
}: {
  rating?: number | null | undefined
  reviewRateDescriptions: string[] | null | undefined
}) {
  const comment =
    rating && reviewRateDescriptions ? reviewRateDescriptions[rating] : ''
  return <Comment>{comment}</Comment>
}

function RecentReviewInfo({ visitDate }: { visitDate?: string | null }) {
  const { t } = useTranslation('common-web')

  const [visitYear, visitMonth] = visitDate?.split('-') || []

  if (!visitDate) {
    return null
  }

  return (
    <Text css={{ fontSize: 13 }}>
      {t(
        [
          'visityear-nyeon-visitmonth-weol-yeohaeng',
          '{{visitYear}}년 {{visitMonth}}월 여행',
        ],
        {
          visitYear,
          visitMonth,
        },
      )}
    </Text>
  )
}
