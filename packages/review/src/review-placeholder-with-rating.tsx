import * as React from 'react'
import styled from 'styled-components'
import { Container, Rating, Text } from '@titicaca/core-elements'

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
export default function ReviewsPlaceholder({
  resourceType,
  placeholderText = DEFAULT_PLACEHOLDER_TEXT,
  onClick,
}) {
  return (
    <PlaceholderContainer margin={{ top: 20 }} onClick={onClick}>
      {resourceType === 'article' ? (
        <GuideImage />
      ) : (
        <Rating size="medium" onClick={onClick} />
      )}
      <Text
        margin={{ top: 8 }}
        size="large"
        color="gray"
        alpha={1}
        lineHeight={1.5}
      >
        {placeholderText}
      </Text>
    </PlaceholderContainer>
  )
}
