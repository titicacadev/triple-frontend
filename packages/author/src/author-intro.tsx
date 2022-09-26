import styled from 'styled-components'
import { Text } from '@titicaca/core-elements'
import { getColor } from '@titicaca/color-palette'

const Html = styled.div`
  line-height: 1.43;
  margin: 21px 0 0 0;
  color: rgba(${getColor('gray500')});
  font-size: 14px;
  font-weight: 500;
  a {
    color: rgba(${getColor('gray500')});
  }
`

export default function AuthorIntro({
  value: { rawHTML, text },
}: {
  value: { text?: string; rawHTML?: string }
}) {
  if (rawHTML) {
    return <Html dangerouslySetInnerHTML={{ __html: rawHTML }} />
  }
  return (
    <Text alpha={0.5} size={14} lineHeight={1.43} margin={{ top: 21 }}>
      {text}
    </Text>
  )
}
