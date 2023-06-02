import { useState, PropsWithChildren, useCallback } from 'react'
import moment from 'moment'
import { useTranslation } from '@titicaca/next-i18next'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { FlexBox, List, Container, Text, Rating } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { Timestamp } from '@titicaca/view-utilities'
import {
  useTripleClientActions,
  useTripleClientMetadata,
} from '@titicaca/react-triple-client-interfaces'
import { TransitionType } from '@titicaca/modals'

import { BaseReviewFragment } from '../../data/graphql'
import {
  useClientActions,
  useLikeReviewMutation,
  useUnlikeReviewMutation,
} from '../../services'
import { HASH_MY_REVIEW_ACTION_SHEET } from '../my-review-action-sheet'
import { HASH_REVIEW_ACTION_SHEET } from '../others-review-action-sheet'

import User from './user'
import Comment from './comment'
import FoldableComment from './foldable-comment'
import Media from './media'
import { PinnedMessage } from './pinned-message'

const MetaContainer = styled.div`
  margin-top: 5px;
  height: 27px;
`

const MoreIcon = styled.img`
  margin-top: -3px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  cursor: pointer;
`

const MessageCount = styled(Container)<{ isCommaVisible?: boolean }>`
  font-weight: bold;
  background-image: url('https://assets.triple.guide/images/btn-lounge-comment-off@3x.png');
  background-size: 18px 18px;
  background-repeat: no-repeat;

  ${({ isCommaVisible }) =>
    isCommaVisible &&
    css`
      margin-left: 8px;

      &::before {
        position: absolute;
        left: -10px;
        content: '·';
      }
    `}
`

const LikeButton = styled(Container)<{ liked?: boolean }>`
  font-weight: bold;
  text-decoration: none;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  color: ${({ liked }) => (liked ? '--color-blue' : '--color-gray400')};
  background-image: ${({ liked }) =>
    liked
      ? "url('https://assets.triple.guide/images/btn-lounge-thanks-on@3x.png')"
      : "url('https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png')"};
`

export interface ReviewElementProps {
  review: BaseReviewFragment
  isFullList: boolean
  isMyReview: boolean
  reviewRateDescriptions: string[] | null | undefined
  resourceId: string
  regionId?: string
  onMenuClick: (reviewId: string) => void
}

export function ReviewElement({
  review,
  review: {
    user,
    blinded,
    comment,
    recentTrip,
    reviewedAt: originReviewedAt,
    rating,
    media,
    replyBoard,
    resourceType,
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
}: ReviewElementProps) {
  const { t } = useTranslation('common-web')

  const [unfolded, setUnfolded] = useState(false)
  const { trackEvent } = useEventTrackingContext()
  const { push } = useHistoryFunctions()
  const app = useTripleClientMetadata()
  const { showToast } = useTripleClientActions()
  const { navigateReviewDetail, navigateUserDetail } = useClientActions()

  const { mutate: likeReview } = useLikeReviewMutation()
  const { mutate: unlikeReview } = useUnlikeReviewMutation()

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
    }, [
      trackEvent,
      review.id,
      resourceId,
      recentTrip,
      navigateReviewDetail,
      regionId,
    ]),
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

  const handleMessageCountClick = useAppCallback(
    TransitionType.ReviewCommentSelect,
    useSessionCallback(
      useCallback(() => {
        trackEvent({
          ga: ['리뷰_댓글_선택', review.id],
          fa: {
            action: '리뷰_댓글_선택',
            item_id: review.id,
            resource_id: resourceId,
            region_id: regionId,
            content_type: resourceType,
          },
        })

        navigateReviewDetail({
          reviewId: review.id,
          regionId,
          resourceId,
          anchor: 'reply',
        })
      }, [
        navigateReviewDetail,
        regionId,
        resourceId,
        resourceType,
        review.id,
        trackEvent,
      ]),
      { triggeredEventAction: '리뷰_댓글_선택' },
    ),
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
        {!blinded && !!rating ? <Score score={rating} /> : null}
        {!blinded ? (
          <RecentReviewInfo visitDate={visitDate} recentTrip={recentTrip} />
        ) : null}
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
                onUnfoldButtonClick={() => {
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
              margin: '10px 0 0',
            }}
          >
            <Media media={media} reviewId={review.id} />
          </Container>
        ) : null}
        {replyBoard?.pinnedMessages[0] ? (
          <PinnedMessage
            pinnedMessage={replyBoard?.pinnedMessages[0]}
            onPinnedMessageClick={handleReviewClick}
          />
        ) : null}
        <Meta>
          {!blinded ? (
            <LikeButton
              display="inline-block"
              liked={liked}
              css={{
                marginTop: 5,
                padding: '2px 10px 2px 20px',
                height: 18,
              }}
              onClick={handleLikeButtonClick}
            >
              {likesCount}
            </LikeButton>
          ) : null}

          <MessageCount
            display="inline-block"
            position="relative"
            isCommaVisible={!blinded}
            css={{
              height: 18,
              marginTop: 5,
              padding: '2px 0 2px 20px',
            }}
            onClick={handleMessageCountClick}
          >
            {replyBoard
              ? replyBoard.rootMessagesCount +
                replyBoard.childMessagesCount +
                replyBoard.pinnedMessagesCount
              : 0}
          </MessageCount>

          {!blinded || (blinded && isMyReview) ? (
            <Date floated="right">
              <Timestamp date={reviewedAt} />
              <MoreIcon
                src="https://assets.triple.guide/images/btn-review-more@4x.png"
                onClick={handleMenuClick}
              />
            </Date>
          ) : null}
        </Meta>
      </List.Item>
    </IntersectionObserver>
  )
}

function Score({ score }: { score?: number }) {
  return (
    <Container
      css={{
        margin: '18px 0 0',
      }}
    >
      <Rating size="tiny" score={score} />
    </Container>
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
        margin: '6px 0 0',
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <a onClick={onClick}>
        <Comment>{children}</Comment>
      </a>
    </Container>
  )
}

function Meta({ children }: PropsWithChildren<unknown>) {
  return (
    <MetaContainer>
      <Text size="mini" color="gray" alpha={0.4}>
        {children}
      </Text>
    </MetaContainer>
  )
}

function Date({
  floated,
  children,
}: PropsWithChildren<{ floated?: CSS.Property.Float }>) {
  return (
    <Container
      floated={floated}
      css={{
        margin: '2px 0 0',
      }}
    >
      {children}
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

function RecentReviewInfo({
  visitDate,
  recentTrip,
}: {
  visitDate?: string | null
  recentTrip: boolean
}) {
  const { t } = useTranslation('common-web')

  const startDate = moment('2000-01')
  const endDate = moment().subtract(180, 'days').format('YYYY-MM')
  const isOldReview =
    visitDate && moment(visitDate).isBetween(startDate, endDate)

  const [visitYear, visitMonth] = visitDate?.split('-') || []

  return (
    <FlexBox
      flex
      alignItems="center"
      css={{
        padding: '8px 0 0',
      }}
    >
      {recentTrip && !isOldReview ? (
        <>
          <img
            width={16}
            height={16}
            src="https://assets.triple.guide/images/ico_recently_badge@4x.png"
            alt="recent-trip-icon"
          />
          <Text padding={{ left: 4, right: 8 }} size={14} color="blue" bold>
            {t(['coegeun-yeohaeng', '최근 여행'])}
          </Text>
        </>
      ) : null}
      {visitDate ? (
        <Text size={14} color="gray700">
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
      ) : null}
    </FlexBox>
  )
}
