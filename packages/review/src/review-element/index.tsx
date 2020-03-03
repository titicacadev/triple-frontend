import React, { PropsWithChildren, ComponentType } from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import IntersectionObserver from '@titicaca/intersection-observer'
import { List, Container, Text, Rating } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { useReviewLikesContext } from '../review-likes-context'
import User from './user'
import Comment from './comment'
import FoldableComment from './foldable-comment'
import { ReviewData } from '../types'

type ReviewEventHandler<T = Element, E = Event> = (
  e: React.SyntheticEvent<T, E>,
  review: ReviewData,
) => void

export interface ReviewElementProps {
  review: ReviewData
  isMyReview: boolean
  index: number
  regionId: string
  appUrlScheme: string
  onUserClick: ReviewEventHandler
  onLikeButtonClick: ReviewEventHandler
  onMenuClick: ReviewEventHandler
  onShow?: (index: number) => void
  reviewRateDescriptions?: string[]
  likeVisible?: boolean
  menuVisible?: boolean
  DateFormatter?: ComponentType<{ date: string }>
  resourceId: string
}

const MoreIcon = styled.img`
  margin-top: -3px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  cursor: pointer;
`
const SoloImageContainer = styled.div`
  margin-top: 17px;
  white-space: nowrap;
  overflow-x: hidden;

  img {
    width: 335px;
    height: 175px;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
  }
`
const Images = styled.div`
  margin-top: 17px;
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  img {
    width: 275px;
    height: 175px;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 9px;
    }
  }
`

const LikeButton = styled.div<{ liked?: boolean }>`
  display: inline-block;
  text-decoration: none;
  width: 100px;
  height: 18px;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  margin-right: 8px;
  padding: 2px 20px;
  ${({ liked }) => css`
  background-image: url('https://assets.triple.guide/images/btn-lounge-thanks-${
    liked ? 'on' : 'off'
  }@3x.png');
  `};
`

export default function ReviewElement({
  review,
  isMyReview,
  index,
  regionId,
  appUrlScheme,
  onUserClick,
  onLikeButtonClick,
  onMenuClick,
  onShow,
  likeVisible,
  menuVisible,
  DateFormatter,
  reviewRateDescriptions,
  resourceId,
}: ReviewElementProps) {
  const { deriveCurrentStateAndCount } = useReviewLikesContext()
  const { user, blindedAt, comment, createdAt, rating, media } = review
  const { trackEvent } = useEventTrackingContext()
  const { liked, likesCount } = deriveCurrentStateAndCount({
    reviewId: review.id,
    liked: review.liked,
    likesCount: review.likesCount,
  })
  const handleSelectReview = () => {
    trackEvent({
      ga: ['리뷰_선택'],
      fa: {
        action: '리뷰_선택',
        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
        review_id: review.id, // eslint-disable-line @typescript-eslint/camelcase
      },
    })

    window.location.href = `${appUrlScheme}:///reviews/${review.id}/detail?region_id=${regionId}&resource_id=${resourceId}`
  }
  return (
    <IntersectionObserver
      onChange={({ isIntersecting }) =>
        isIntersecting && onShow && onShow(index)
      }
    >
      <List.Item>
        <User user={user} onClick={(e) => onUserClick(e, review)}>
          {!blindedAt && !!rating ? <Score score={rating} /> : null}
        </User>
        <Content onClick={handleSelectReview}>
          {blindedAt ? (
            '신고가 접수되어 블라인드 처리되었습니다.'
          ) : comment ? (
            <FoldableComment comment={comment} />
          ) : (
            <RateDescription
              rating={rating}
              reviewRateDescriptions={reviewRateDescriptions}
            />
          )}
          {!blindedAt && (media || []).length > 0 && (
            <>
              {media && media.length === 1 ? (
                <SoloImageContainer>
                  <img src={media[0].sizes.large.url} />
                </SoloImageContainer>
              ) : (
                <Images>
                  {(media || []).map((image, i) => (
                    <img key={i} src={image.sizes.large.url} />
                  ))}
                </Images>
              )}
            </>
          )}
        </Content>
        <Meta>
          {!blindedAt && likeVisible !== false ? (
            <LikeButton
              liked={liked}
              onClick={(e) => {
                const actionName = `리뷰_땡스${liked ? '' : '취소'}`
                trackEvent({
                  ga: [actionName],
                  fa: {
                    action: actionName,
                    review_id: review.id, // eslint-disable-line @typescript-eslint/camelcase
                    item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
                  },
                })
                onLikeButtonClick(e, { ...review, liked })
              }}
            >
              {likesCount}
            </LikeButton>
          ) : null}
          {!blindedAt || (blindedAt && isMyReview) ? (
            <Date floated={likeVisible !== false ? 'right' : undefined}>
              {DateFormatter ? <DateFormatter date={createdAt} /> : createdAt}
              {menuVisible !== false && (
                <MoreIcon
                  src="https://assets.triple.guide/images/btn-review-more@4x.png"
                  onClick={(e) => onMenuClick(e, review)}
                />
              )}
            </Date>
          ) : null}
        </Meta>
      </List.Item>
    </IntersectionObserver>
  )
}

function Score({ score }: { score?: number }) {
  return (
    <Container margin={{ top: 20 }}>
      <Rating size="tiny" score={score} />
    </Container>
  )
}

function Content({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <Container margin={{ top: 15 }} clearing>
      <a onClick={onClick}>
        <Comment>{children}</Comment>
      </a>
    </Container>
  )
}

function Meta({ children }: PropsWithChildren<{}>) {
  return (
    <Text margin={{ top: 20 }} size="mini" color="gray" alpha={0.3}>
      {children}
    </Text>
  )
}

function Date({
  floated,
  children,
}: PropsWithChildren<{ floated?: CSS.FloatProperty }>) {
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
