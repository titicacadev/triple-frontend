import { styled } from 'styled-components'
import { Container, Text } from '@titicaca/tds-ui'

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

/**
 * 콘텐츠 하단에 들어가는 공유 영역입니다. 카카오톡 공유, 클립보드 복사, 기타 공유 버튼을 표시하고 있습니다.
 */
export function ContentSharing({
  onShareClick,
  label,
}: {
  onShareClick: ({ method }: { method: Method }) => void
  label: string
}) {
  return (
    <Container
      css={{
        textAlign: 'center',
        margin: '50px 0',
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
