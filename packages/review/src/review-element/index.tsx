import React, { useState, PropsWithChildren, ComponentType } from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import IntersectionObserver from '@titicaca/intersection-observer'
import { List, Container, Text, Rating } from '@titicaca/core-elements'

import { useReviewLikesContext } from '../review-likes-context'
import User from './user'
import Comment from './comment'
import FoldableComment from './foldable-comment'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { ReviewData, ImageEntity } from '../types'

type ReviewEventHandler<T = Element, E = Event> = (
  e: React.SyntheticEvent<T, E>,
  review: ReviewData,
) => void

export interface ReviewElementProps {
  review: ReviewData
  isMyReview: boolean
  index: number
  onUserClick: ReviewEventHandler
  onUnfoldButtonClick?: ReviewEventHandler
  onLikeButtonClick: ReviewEventHandler
  onLikesCountClick: ReviewEventHandler
  onMenuClick: ReviewEventHandler
  onImageClick: (
    e: React.SyntheticEvent,
    review: ReviewData,
    image: ImageEntity,
  ) => void
  onShow?: (index: number) => void
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

const LikeButton = styled.a<{ liked?: boolean }>`
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;

  margin-right: 8px;
  padding: 5px 7px;
  border-radius: 3px;

  ${({ liked }) => css`
    color: ${liked ? '#ffffff' : 'rgba(58, 58, 58, 0.8)'};
    background-color: ${liked ? '#368fff' : '#fafafa'};
  `};
`

export default function ReviewElement({
  review,
  isMyReview,
  index,
  onUserClick,
  onUnfoldButtonClick,
  onLikeButtonClick,
  onLikesCountClick,
  onMenuClick,
  onImageClick,
  onShow,
  likeVisible,
  menuVisible,
  DateFormatter,
  resourceId,
}: ReviewElementProps) {
  const [unfolded, setUnfolded] = useState(false)
  const { deriveCurrentStateAndCount } = useReviewLikesContext()
  const { trackEvent } = useEventTrackingContext()
  const { user, blindedAt, comment, createdAt, rating, media } = review

  const { liked, likesCount } = deriveCurrentStateAndCount({
    reviewId: review.id,
    liked: review.liked,
    likesCount: review.likesCount,
  })

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
        <Content>
          {blindedAt ? (
            '신고가 접수되어 블라인드 처리되었습니다.'
          ) : unfolded ? (
            comment
          ) : (
            <FoldableComment
              comment={comment}
              onUnfoldButtonClick={(e) => {
                trackEvent({
                  ga: ['리뷰_리뷰글더보기'],
                  fa: {
                    action: '리뷰_리뷰글더보기',
                    item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
                  },
                })
                setUnfolded(true)

                onUnfoldButtonClick && onUnfoldButtonClick(e, review)
              }}
            />
          )}
          {!blindedAt && (
            <Images>
              {(media || []).map((image, i) => (
                <img
                  key={i}
                  src={image.sizes.large.url}
                  onClick={(e) => {
                    trackEvent({
                      ga: ['리뷰_리뷰사진썸네일'],
                      fa: {
                        action: '리뷰_리뷰사진썸네일',
                        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
                        photo_id: image.id, // eslint-disable-line @typescript-eslint/camelcase
                      },
                    })
                    onImageClick(e, review, image)
                  }}
                />
              ))}
            </Images>
          )}
        </Content>
        <Meta>
          {!blindedAt && likeVisible !== false ? (
            <>
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
                Thanks
              </LikeButton>
              {likesCount && likesCount > 0 ? (
                <span
                  onClick={(e) => {
                    trackEvent({
                      ga: ['리뷰_땡스_리스트보기'],
                      fa: {
                        action: '리뷰_땡스_리스트보기',
                        review_id: review.id, // eslint-disable-line @typescript-eslint/camelcase
                        item_id: resourceId, // eslint-disable-line @typescript-eslint/camelcase
                      },
                    })
                    onLikesCountClick(e, review)
                  }}
                >
                  {likesCount}명
                </span>
              ) : null}
            </>
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

function Content({ children }: PropsWithChildren<{}>) {
  return (
    <Container margin={{ top: 15 }} clearing>
      <Comment>{children}</Comment>
    </Container>
  )
}

function Meta({ children }: PropsWithChildren<{}>) {
  return (
    <Text margin={{ top: 20 }} bold size="mini" color="gray" alpha={0.3}>
      {children}
    </Text>
  )
}

function Date({
  floated,
  children,
}: PropsWithChildren<{ floated?: CSS.FloatProperty }>) {
  return <Container floated={floated}>{children}</Container>
}
