import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

const ShareIcon = styled.img`
  margin: 0 5px;
  width: 46px;
  height: 46px;
`

export enum Method {
  Kakao = 'kakao',
  Clipboard = 'clipboard',
  Other = 'other',
}

export default function ContentSharing({
  onShareClick,
  label,
}: {
  onShareClick: ({ method }: { method: Method }) => void
  label: string
}) {
  return (
    <Container
      margin={{ top: 50, bottom: 50 }}
      css={{
        textAlign: 'center',
      }}
    >
      <ShareIcon
        src="https://assets.triple.guide/images/btn-end-invite-kakao@3x.png"
        onClick={() => onShareClick({ method: Method.Kakao })}
      />
      <ShareIcon
        src="https://assets.triple.guide/images/btn-end-invite-copy@3x.png"
        onClick={() => onShareClick({ method: Method.Clipboard })}
      />
      <ShareIcon
        src="https://assets.triple.guide/images/btn-end-invite-more@3x.png"
        onClick={() => onShareClick({ method: Method.Other })}
      />
      <Text margin={{ top: 19 }} center alpha={1}>
        {label}
      </Text>
    </Container>
  )
}
