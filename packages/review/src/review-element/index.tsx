import React, { useState, PropsWithChildren, ComponentType } from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import semver from 'semver'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { List, Container, Text, Rating } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { ImageMeta } from '@titicaca/type-definitions'

import { useReviewLikesContext } from '../review-likes-context'
import { ReviewData } from '../types'

import User from './user'
import Comment from './comment'
import FoldableComment from './foldable-comment'
import Images from './images'

type ReviewEventHandler<T = Element, E = Event> = (
  e: React.SyntheticEvent<T, E>,
  review: ReviewData,
) => void

export interface ReviewElementProps {
  review: ReviewData
  isMyReview: boolean
  index: number
  onUserClick?: ReviewEventHandler
  onUnfoldButtonClick?: ReviewEventHandler
  onLikeButtonClick: ReviewEventHandler
  onMenuClick: ReviewEventHandler
  onImageClick: (
    e: React.SyntheticEvent,
    review: ReviewData,
    image: ImageMeta,
    index: number,
  ) => void
  onReviewClick: (e: React.SyntheticEvent, reviewId: string) => void
  onShow?: (index: number) => void
  reviewRateDescriptions?: string[]
  DateFormatter?: ComponentType<{ date: string }>
  resourceId: string
}

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
  ${({ liked }) => css`
    color: var(${liked ? '--color-blue' : '--color-gray400'});
    background-image: url('https://assets.triple.guide/images/btn-lounge-thanks-${liked
      ? 'on'
      : 'off'}@3x.png');
  `};
`

const LOUNGE_APP_VERSION = '4.3.0'
const MESSAGE_COUNT_APP_VERSION = '5.5.0'

export default function ReviewElement({
  review,
  review: { user, blindedAt, comment, createdAt, rating, media, replyBoard },
  isMyReview,
  index,
  onUserClick,
  onUnfoldButtonClick,
  onLikeButtonClick,
  onMenuClick,
  onImageClick,
  onReviewClick,
  onShow,
  DateFormatter,
  reviewRateDescriptions,
  resourceId,
}: ReviewElementProps) {
  const [unfolded, setUnfolded] = useState(false)
  const { deriveCurrentStateAndCount } = useReviewLikesContext()
  const appVersion = semver.coerce(useUserAgentContext()?.app?.version)
  const { isPublic } = useUserAgentContext()
  const { trackEvent } = useEventTrackingContext()
  const { liked, likesCount } = deriveCurrentStateAndCount({
    reviewId: review.id,
    liked: review.liked,
    likesCount: review.likesCount,
  })
  const isMessageCountVisible = Boolean(
    ((appVersion && semver.gte(appVersion, MESSAGE_COUNT_APP_VERSION)) ||
      isPublic) &&
      replyBoard &&
      replyBoard.rootMessagesCount + replyBoard.childMessagesCount > 0,
  )

  return (
    <IntersectionObserver
      onChange={({ isIntersecting }) =>
        isIntersecting && onShow && onShow(index)
      }
    >
      <List.Item style={{ paddingTop: 6 }}>
        <User
          user={user}
          onClick={onUserClick && ((e) => onUserClick(e, review))}
        />
        {!blindedAt && !!rating ? <Score score={rating} /> : null}
        <Content
          onClick={(e: React.SyntheticEvent) => onReviewClick(e, review.id)}
        >
          {blindedAt ? (
            '신고가 접수되어 블라인드 처리되었습니다.'
          ) : comment ? (
            unfolded ? (
              comment
            ) : (
              <FoldableComment
                comment={comment}
                hasImage={(media || []).length > 0}
                onUnfoldButtonClick={(e) => {
                  if (
                    appVersion &&
                    semver.gte(appVersion, LOUNGE_APP_VERSION)
                  ) {
                    return
                  }

                  trackEvent({
                    ga: ['리뷰_리뷰글더보기'],
                    fa: {
                      action: '리뷰_리뷰글더보기',
                      item_id: resourceId,
                    },
                  })
                  setUnfolded(true)

                  onUnfoldButtonClick && onUnfoldButtonClick(e, review)
                }}
              />
            )
          ) : (
            <RateDescription
              rating={rating}
              reviewRateDescriptions={reviewRateDescriptions}
            />
          )}
          {!blindedAt && media && media.length > 0 ? (
            <Container margin={{ top: 10 }}>
              <Images
                images={media}
                onImageClick={(e) =>
                  onImageClick(e, review, media[index], index)
                }
              />
            </Container>
          ) : null}
        </Content>
        <Meta>
          {!blindedAt ? (
            <LikeButton
              display="inline-block"
              margin={{ top: 5 }}
              padding={{ top: 2, bottom: 2, right: 10, left: 20 }}
              height={18}
              liked={liked}
              onClick={(e) => {
                const actionName = `리뷰_땡스${liked ? '' : '취소'}`
                trackEvent({
                  ga: [actionName],
                  fa: {
                    action: actionName,
                    review_id: review.id,
                    item_id: resourceId,
                  },
                })
                onLikeButtonClick(e, { ...review, liked })
              }}
            >
              {likesCount}
            </LikeButton>
          ) : null}

          {isMessageCountVisible ? (
            <MessageCount
              display="inline-block"
              position="relative"
              height={18}
              margin={{ top: 5 }}
              padding={{ top: 2, bottom: 2, left: 20, right: 0 }}
              isCommaVisible={!blindedAt}
            >
              {replyBoard &&
                replyBoard.rootMessagesCount + replyBoard.childMessagesCount}
            </MessageCount>
          ) : null}

          {!blindedAt || (blindedAt && isMyReview) ? (
            <Date floated="right">
              {DateFormatter ? <DateFormatter date={createdAt} /> : createdAt}
              <MoreIcon
                src="https://assets.triple.guide/images/btn-review-more@4x.png"
                onClick={(e) => onMenuClick(e, review)}
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
    <Container margin={{ top: 18 }}>
      <Rating size="tiny" score={score} />
    </Container>
  )
}

function Content({ onClick, children }: PropsWithChildren<{ onClick?: any }>) {
  return (
    <Container margin={{ top: 6 }} clearing>
      <a onClick={onClick}>
        <Comment>{children}</Comment>
      </a>
    </Container>
  )
}

function Meta({ children }: PropsWithChildren<{}>) {
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
    <Container floated={floated} margin={{ top: 2 }}>
      {children}
    </Container>
  )
}

function RateDescription({
  rating,
  reviewRateDescriptions,
}: {
  rating?: number | null | undefined
  reviewRateDescriptions: string[] | undefined
}) {
  const comment =
    rating && reviewRateDescriptions ? reviewRateDescriptions[rating] : ''
  return <Comment>{comment}</Comment>
}
