import React from 'react'
import styled from 'styled-components'

import { Container, Text } from '@titicaca/core-elements'

const ShareIcon = styled.img`
  margin: 0 5px;
  display: inline;
  width: 46px;
  height: 46px;
`

export default function ContentSharing({
  onShareClick,
  title,
}: {
  onShareClick: ({ method: string }) => any
  title: string
  userAgent: { isPublic: boolean }
  source: any
}) {
  return (
    <Container textAlign="center" margin={{ top: 50, bottom: 50 }}>
      <ShareIcon
        src="http://assets.triple.guide/images/btn-end-invite-kakao@3x.png"
        onClick={() => onShareClick({ method: 'kakao' })}
      />
      <ShareIcon
        src="http://assets.triple.guide/images/btn-end-invite-copy@3x.png"
        onClick={() => onShareClick({ method: 'clipboard' })}
      />
      <ShareIcon
        src="http://assets.triple.guide/images/btn-end-invite-more@3x.png"
        onClick={() => onShareClick({ method: 'other' })}
      />
      <Text margin={{ top: 19 }} center alpha={1}>
        {title}
      </Text>
    </Container>
  )
}
