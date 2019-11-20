import * as React from 'react'
import styled from 'styled-components'
import { Container, Rating, Text } from '@titicaca/core-elements'

const CommentByTypes = new Map()
CommentByTypes.set('tna', {
  title: '이 투어·티켓 어떠셨나요?',
  description: '리뷰를 남겨주시면, 여행자클럽 포인트를 드려요!',
})
CommentByTypes.set('poi', {
  title: '이곳의 첫 번째 리뷰를 올려주세요.',
  description: '리뷰를 남겨주시면, 여행자클럽 포인트를 드려요!',
})
CommentByTypes.set('article', {
  title: '이 가이드 어떠셨나요?',
  description: '여행 팁을 공유해주시면, 여행자클럽 포인트를 드려요!',
})
CommentByTypes.set('hotel', {
  title: '이 호텔 어떠셨나요?',
  description: '리뷰를 남겨주시면, 여행자클럽 포인트를 드려요!',
})
CommentByTypes.set('default', {
  title: '이곳의 첫 번째 리뷰를 올려주세요.',
  description: '리뷰를 남겨주시면, 여행자클럽 포인트를 드려요!',
})

const PlaceholderContainer = styled(Container)`
  width: 100%;
  text-align: center;
`

const MileageButton = styled.button.attrs({ type: 'button' })`
  display: block;
  padding-top: 19px;
  font-size: 13px;
  color: #2987f0;
  text-decoration: underline;
  cursor: pointer;
  margin: 0 auto;
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
  appUrlScheme,
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
        {CommentByTypes.get(resourceType || 'default').title}
      </Text>
      <Text color="gray" alpha={0.5} size="tiny" margin={{ top: 3 }}>
        {CommentByTypes.get(resourceType || 'default').description}
      </Text>
      <MileageButton
        onClick={(e) => {
          window.location.href = `${appUrlScheme}:///my/mileage`
          e.preventDefault()
        }}
      >
        여행자 클럽 혜택보기
      </MileageButton>
    </PlaceholderContainer>
  )
}
