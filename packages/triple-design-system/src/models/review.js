import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'

import List from '../elements/list'
import Container from '../elements/container'
import Text from '../elements/text'
import Rating from '../elements/rating'

const UserPhoto = styled.img`
  margin-right: 9px;
  width: 38px;
  height: 38px;
  float: left;
  background-color: #efefef;
  border-radius: 19px;
  object-fit: cover;
`

const Badge = styled.img`
  position: absolute;
  top: 22px;
  left: 25px;
  width: 18px;
  height: 18px;
`

const MoreIcon = styled.img`
  margin-top: -3px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
`

function Name({ children }) {
  return (
    <Text bold size="large" color="gray" alpha={1}>
      {children}
    </Text>
  )
}

function UserExtra({ children }) {
  return (
    <Text margin={{ top: 4 }} bold size="mini" color="gray" alpha={0.3}>
      {children}
    </Text>
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
    <Container margin={{ top: 17 }}>
      <Text size="large" color="gray" alpha={0.7}>
        {children}
      </Text>
    </Container>
  )
}

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

    &:not(:first-child) {
      margin-left: 9px;
    }
  }
`

function Meta({ children }) {
  return (
    <Text margin={{ top: 20 }} bold size="mini" color="gray" alpha={0.3}>
      {children}
    </Text>
  )
}

const LikeButton = styled.a`
  display: inline-block;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;

  margin-right: 8px;
  padding: 5px 7px;
  border-radius: 3px;
  background-color: #fafafa;

  ${({ liked }) => css`
    color: ${liked ? '#368fff' : 'rgba(58, 58, 58, 0.2)'};
  `};
`

function Date({ children }) {
  return <Container floated="right">{children}</Container>
}

const ItemContainer = styled(Container)`
  padding-bottom: 2px;
`

class ReviewItem extends PureComponent {
  render() {
    const {
      props: { children },
    } = this

    return (
      <List.Item>
        <ItemContainer>{children}</ItemContainer>
      </List.Item>
    )
  }
}

class Review extends PureComponent {
  render() {
    const {
      props: { children, ...props },
    } = this

    return (
      <List divided verticalGap={60} {...props}>
        {children}
      </List>
    )
  }
}

function ReviewElement({
  review: {
    user: {
      photo,
      name,
      userBoard: { reviews: reviewsCount },
      mileage,
    },
    thanks,
    liked,
    comment,
    createdAt,
    rating,
    attachments,
  },
  DateFormatter,
}) {
  const badge = mileage && mileage.badges && mileage.badges[0]

  return (
    <ReviewItem>
      <Container>
        <UserPhoto src={photo} />
        {badge && <Badge src={badge.icon.imageUrl} />}
        <Name>{name}</Name>
        <UserExtra>
          {badge
            ? `${badge.label} / ${reviewsCount}개의 리뷰`
            : `${reviewsCount}개의 리뷰`}
          <Score score={rating} />
        </UserExtra>
      </Container>
      <Content>
        {comment}
        <Images>
          {(attachments || []).slice(0, 3).map(({ smallThumbnail }, i) => (
            <img key={i} src={smallThumbnail} />
          ))}
        </Images>
      </Content>
      <Meta>
        <LikeButton liked={liked}>Thanks</LikeButton>
        {thanks}명
        <Date>
          {DateFormatter ? (
            <DateFormatter>{createdAt}</DateFormatter>
          ) : (
            createdAt
          )}
          <MoreIcon src="http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/btn-review-more@2x.png" />
        </Date>
      </Meta>
    </ReviewItem>
  )
}

export function ReviewsList({ margin, reviews = [], DateFormatter }) {
  return (
    <Review margin={margin} divided verticalGap={60}>
      {reviews.map((review, i) => (
        <ReviewElement key={i} review={review} DateFormatter={DateFormatter} />
      ))}
    </Review>
  )
}
