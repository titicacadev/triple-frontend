import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import User from './user'
import IntersectionObserver from '@titicaca/intersection-observer'

import { List, Container, Text, Rating } from '@titicaca/core-elements'

import Comment from './comment'
import FoldableComment from './foldable-comment'

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
    width: 80px;
    height: 80px;
    border-radius: 3px;
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
}: {
  review?: any
  index?: number
  onUserClick?: (e?: React.SyntheticEvent, review?: any) => any
  onUnfoldButtonClick?: (e?: React.SyntheticEvent, review?: any) => any
  onLikeButtonClick?: (e?: React.SyntheticEvent, review?: any) => any
  onLikesCountClick?: (e?: React.SyntheticEvent, review?: any) => any
  onMenuClick?: (e?: React.SyntheticEvent, review?: any) => any
  onImageClick?: (e?: React.SyntheticEvent, review?: any, image?: any) => any
  onShow?: (index: number) => any
  likeVisible?: boolean
  menuVisible?: boolean
  DateFormatter?: React.ComponentClass | React.FunctionComponent
}) {
  const [unfolded, setUnfolded] = useState(false)

  const {
    user,
    blindedAt,
    likeCount,
    liked,
    comment,
    createdAt,
    rating,
    media,
  } = review

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
              onUnfoldButtonClick={(e) => {
                setUnfolded(true)

                onUnfoldButtonClick && onUnfoldButtonClick(e, review)
              }}
            >
              {comment}
            </FoldableComment>
          )}
          {!blindedAt && (
            <Images>
              {(media || []).map((image, i) => (
                <img
                  key={i}
                  src={image.sizes.smallSquare.url}
                  onClick={(e) => onImageClick(e, review, image)}
                />
              ))}
            </Images>
          )}
        </Content>
        {!blindedAt && (
          <Meta>
            {likeVisible !== false ? (
              <>
                <LikeButton
                  liked={liked}
                  onClick={(e) => onLikeButtonClick(e, review)}
                >
                  Thanks
                </LikeButton>
                {likeCount && likeCount > 0 ? (
                  <span onClick={(e) => onLikesCountClick(e, review)}>
                    {likeCount}명
                  </span>
                ) : null}
              </>
            ) : null}
            <Date floated={likeVisible !== false && 'right'}>
              {DateFormatter ? (
                <DateFormatter>{createdAt}</DateFormatter>
              ) : (
                createdAt
              )}
              {menuVisible !== false && (
                <MoreIcon
                  src="https://assets.triple.guide/images/btn-review-more@4x.png"
                  onClick={(e) => onMenuClick(e, review)}
                />
              )}
            </Date>
          </Meta>
        )}
      </List.Item>
    </IntersectionObserver>
  )
}

function Score({ score }) {
  return (
    <Container floated="right">
      <Rating size="tiny" score={score} />
    </Container>
  )
}

function Content({ children }) {
  return (
    <Container margin={{ top: 17 }} clearing>
      <Comment>{children}</Comment>
    </Container>
  )
}

function Meta({ children }) {
  return (
    <Text margin={{ top: 20 }} bold size="mini" color="gray" alpha={0.3}>
      {children}
    </Text>
  )
}

function Date({ floated, children }) {
  return <Container floated={floated}>{children}</Container>
}
