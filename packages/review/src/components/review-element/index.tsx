import {
  Container,
  FlexBox,
  List,
  Rating,
  Text,
  shouldForwardProp,
} from '@titicaca/core-elements'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { TransitionType } from '@titicaca/modals'
import { useTranslation } from '@titicaca/next-i18next'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { Timestamp } from '@titicaca/view-utilities'
import moment from 'moment'
import { PropsWithChildren, useCallback, useState } from 'react'
import styled, { css, CSSProp } from 'styled-components'

import { BaseReviewFragment } from '../../data/graphql'
import {
  useClientActions,
  useLikeReviewMutation,
  useUnlikeReviewMutation,
} from '../../services'
import { HASH_MY_REVIEW_ACTION_SHEET } from '../my-review-action-sheet'
import { HASH_REVIEW_ACTION_SHEET } from '../others-review-action-sheet'

import Comment from './comment'
import FoldableComment from './foldable-comment'
import Media from './media'
import { PinnedMessage } from './pinned-message'
import User from './user'
import { ReviewBadges } from './badges'
import PurchaseInfo from './purchaseInfo'

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

const LikeButton = styled.button.withConfig({
  shouldForwardProp,
})<{ liked?: boolean; css?: CSSProp }>`
  font-weight: bold;
  text-decoration: none;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  color: ${({ liked }) => (liked ? '--color-blue' : '--color-gray400')};
  background-image: ${({ liked }) =>
    liked
      ? "url('https://assets.triple.guide/images/btn-lounge-thanks-on@3x.png')"
      : "url('https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png')"};
  ${(props) => props.css}
`

const ReviewMetadataInfo = styled(FlexBox)`
  margin-top: 16px;
  margin-bottom: 16px;

  > * {
    height: 16px;
    display: inline-block;
    line-height: 16px;
  }

  > :not(:last-child)::after {
    display: block;
    float: right;
    content: '';
    background: url('https://assets.triple.guide/images/dot-gray.svg') 0 0
      no-repeat;
    background-position: center;
    width: 3px;
    height: 16px;
    margin-left: 4px;
    margin-right: 6px;
  }
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
    visitDate: visitDateString,
    liked,
    likesCount,
    purchaseInfo,
  },
  isFullList,
  isMyReview,
  reviewRateDescriptions,
  resourceId,
  regionId,
  onMenuClick,
}: ReviewElementProps) {
  const { t } = useTranslation('common-web')

  const visitDate = visitDateString ? new Date(visitDateString) : null

  const [unfolded, setUnfolded] = useState(false)
  const { trackEvent } = useEventTrackingContext()
  const { push } = useHistoryFunctions()
  const { showToast } = useTripleClientActions()
  const { navigateReviewDetail, navigateUserDetail } = useClientActions()

  const { mutate: likeReview, isLoading: isLikeLoading } =
    useLikeReviewMutation()
  const { mutate: unlikeReview, isLoading: isUnlikeLoading } =
    useUnlikeReviewMutation()

  const likeButtonAction = `리뷰_땡쓰${liked ? '취소' : ''}_선택`

  const handleUserClick = useAppCallback(
    TransitionType.ReviewProfile,
    useSessionCallback(
      useCallback(() => {
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
        review.user,
        review.id,
        trackEvent,
        resourceId,
        showToast,
        t,
        navigateUserDetail,
      ]),
      { triggeredEventAction: '리뷰_프로필_선택' },
    ),
  )

  const handleMenuClick = useAppCallback(
    TransitionType.ReviewMenuSelect,
    useSessionCallback(
      useCallback(() => {
        if (isMyReview) {
          push(HASH_MY_REVIEW_ACTION_SHEET)
        } else {
          onMenuClick?.(review.id)
          push(HASH_REVIEW_ACTION_SHEET)
        }
      }, [isMyReview, onMenuClick, push, review.id]),
      { triggeredEventAction: '리뷰_메뉴_선택' },
    ),
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
        {!blinded ? (
          <ReviewMetadataInfo flex css={{ alignItems: 'center' }}>
            {rating ? <Score score={rating} /> : null}
            {visitDate ? <ReviewDayInfo visitDate={visitDate} /> : null}
          </ReviewMetadataInfo>
        ) : null}

        {!blinded ? (
          <ReviewBadges
            recentTrip={!!visitDate && recentTrip}
            verifiedPurchase={!!purchaseInfo}
          />
        ) : null}

        {!blinded && purchaseInfo ? (
          <PurchaseInfo
            displayName={purchaseInfo.displayName}
            purchaseCount={purchaseInfo.purchaseCount}
          />
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
              liked={liked}
              css={{
                marginTop: 5,
                padding: '2px 10px 2px 20px',
                height: 18,
              }}
              onClick={handleLikeButtonClick}
              disabled={isLikeLoading || isUnlikeLoading}
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
            <Container
              floated="right"
              css={{
                margin: '2px 0 0',
              }}
            >
              <Timestamp date={reviewedAt} />
              <MoreIcon
                src="https://assets.triple.guide/images/btn-review-more@4x.png"
                onClick={handleMenuClick}
              />
            </Container>
          ) : null}
        </Meta>
      </List.Item>
    </IntersectionObserver>
  )
}

function Score({ score }: { score?: number }) {
  return (
    <Container css={{ height: '16px' }}>
      <Rating score={score} verticalAlign="top" />
    </Container>
  )
}

function Content({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <Container clearing>
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

function ReviewDayInfo({ visitDate }: { visitDate: Date }) {
  const { t } = useTranslation('common-web')

  const visitYear = moment(visitDate).year()
  const visitMonth = moment(visitDate).month() + 1

  return (
    <Text size={13} color="gray700" lineHeight="13px">
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
