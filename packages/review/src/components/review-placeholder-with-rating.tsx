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

export default function ReviewsPlaceholder({
  resourceType,
  recentTrip,
  placeholderText = DEFAULT_PLACEHOLDER_TEXT,
  onClick,
}: {
  resourceType: ResourceType
  recentTrip: boolean
  placeholderText?: string
  onClick?: (e: SyntheticEvent, rating?: number) => void
}) {
  return (
    <PlaceholderContainer margin={{ top: 20 }} onClick={onClick}>
      {resourceType === 'article' ? (
        <GuideImage />
      ) : (
        !recentTrip && <Rating size="medium" onClick={onClick} />
      )}
      {recentTrip ? (
        <Container padding={{ top: 60, bottom: 60 }}>
          <Text size={14} color="gray500">
            선택한 조건의 리뷰가 없습니다.
          </Text>
          <NavigateToReviewsListButton
            inverted
            margin={{ top: 10 }}
            onClick={onClick}
          >
            <Text size={13} color="white" bold>
              전체 리뷰 보기
            </Text>
          </NavigateToReviewsListButton>
        </Container>
      ) : (
        <Text
          margin={{ top: recentTrip ? 60 : 8 }}
          size="large"
          color="gray"
          alpha={1}
          lineHeight={1.5}
        >
          {placeholderText}
        </Text>
      )}
    </PlaceholderContainer>
  )
}
