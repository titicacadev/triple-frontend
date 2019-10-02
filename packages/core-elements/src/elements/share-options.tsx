import React from 'react'
import styled from 'styled-components'

import Container from './container'
import Text from './text'

const ShareIcon = styled.img`
  margin: 0 5px;
  display: inline;
  width: 46px;
  height: 46px;
`

export default function ShareOptions({
  onKakaoClick,
  onClibBoardClick,
  onOtherClick,
  title,
}: {
  onKakaoClick: (e?: React.SyntheticEvent) => void
  onClibBoardClick: (e?: React.SyntheticEvent) => void
  onOtherClick: (e?: React.SyntheticEvent) => void
  title: string
}) {
  return (
    <Container textAlign="center" margin={{ top: 50, bottom: 50 }}>
      <ShareIcon
        src="http://assets.triple.guide/images/btn-end-invite-kakao@3x.png"
        onClick={onKakaoClick}
      />
      <ShareIcon
        src="http://assets.triple.guide/images/btn-end-invite-copy@3x.png"
        onClick={onClibBoardClick}
      />
      <ShareIcon
        src="http://assets.triple.guide/images/btn-end-invite-more@3x.png"
        onClick={onOtherClick}
      />
      <Text margin={{ top: 19 }} center alpha={1}>
        {title}
      </Text>
    </Container>
  )
}
