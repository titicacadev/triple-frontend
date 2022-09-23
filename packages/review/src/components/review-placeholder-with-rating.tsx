import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Button, Container, Rating, Text } from '@titicaca/core-elements'

import { ResourceType } from './types'

const DEFAULT_PLACEHOLDER_TEXT = '이곳의 첫 번째 리뷰를 올려주세요.'
const PlaceholderContainer = styled(Container)`
  width: 100%;
  text-align: center;
`

const GuideImage = styled.img`
  content: url('https://assets.triple.guide/images/img-card-guide-review@3x.png');
  display: block;
  width: 50px;
  height: 50px;
  margin: auto;
`

const NavigateToReviewsListButton = styled(Button)`
  padding: 10px 20px;
`

const RecentTripContainer = styled(Container).attrs({
  padding: { top: 180, bottom: 60 },
})`
  text-align: center;
  @media only screen and (max-width: 667px) {
    padding-top: 120px;
  }
`

export default function ReviewsPlaceholder({
  isMorePage,
  hasReviews,
  resourceType,
  recentTrip,
  placeholderText = DEFAULT_PLACEHOLDER_TEXT,
  onClick,
}: {
  isMorePage: boolean
  hasReviews: boolean
  resourceType: ResourceType
  recentTrip: boolean
  placeholderText?: string
  onClick?: (e: SyntheticEvent, rating?: number) => void
}) {
  return (
    <PlaceholderContainer
      margin={{ top: 20 }}
      onClick={!isMorePage ? onClick : undefined}
    >
      {!recentTrip ? (
        resourceType === 'article' ? (
          <GuideImage />
        ) : (
          <Rating size="medium" onClick={onClick} />
        )
      ) : null}

      {recentTrip ? (
        <RecentTripPlaceholder
          isMorePage={isMorePage}
          hasReviews={hasReviews}
          onClick={onClick}
        />
      ) : null}
      {placeholderText && !recentTrip ? (
        <DefaultPlaceholder placeholderText={placeholderText} />
      ) : null}
    </PlaceholderContainer>
  )
}

function DefaultPlaceholder({ placeholderText }: { placeholderText: string }) {
  return (
    <Text
      margin={{ top: 8 }}
      size="large"
      color="gray"
      alpha={1}
      lineHeight={1.5}
    >
      {placeholderText}
    </Text>
  )
}

function RecentTripPlaceholder({
  isMorePage,
  hasReviews,
  onClick,
}: {
  isMorePage: boolean
  hasReviews: boolean
  onClick?: (e: SyntheticEvent, rating?: number) => void
}) {
  return isMorePage ? (
    <RecentTripContainer>
      <img
        width={44}
        height={44}
        src="https://assets.triple.guide/images/ico_empty_review@4x.png"
        alt="write-review-icon"
      />
      <Text
        size={18}
        padding={{ top: 20, bottom: 8 }}
        bold
        lineHeight="21px"
        textAlign="center"
      >
        선택한 조건의 <br />
        리뷰가 없습니다.
      </Text>
      <Text size={14} lineHeight="19px" textAlign="center" color="gray500">
        다녀온 여행지의
        <br />
        리뷰를 남겨보세요.
      </Text>
    </RecentTripContainer>
  ) : (
    <Container padding={{ top: 60, bottom: 60 }}>
      <Text size={14} color="gray500">
        선택한 조건의 리뷰가 없습니다.
      </Text>
      {hasReviews ? (
        <NavigateToReviewsListButton
          inverted
          margin={{ top: 10 }}
          onClick={onClick}
        >
          <Text size={13} color="white" bold>
            전체 리뷰 보기
          </Text>
        </NavigateToReviewsListButton>
      ) : null}
    </Container>
  )
}
