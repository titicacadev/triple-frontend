import { Segment, Text } from '@titicaca/core-elements'
import styled from 'styled-components'

const NoteBodyText = styled(Text).attrs({
  size: 'small',
  color: 'gray',
  alpha: 0.8,
  lineHeight: 1.57,
})`
  a {
    text-decoration: underline;
    color: var(--color-blue);
  }
`

export default function Note({
  value: { title, body, rawHTML },
}: {
  value: { title: string; body?: string; rawHTML?: string }
}) {
  return (
    <Segment css={{ margin: 30 }}>
      <Text bold size="small" color="gray" lineHeight={1.57}>
        {title}
      </Text>
      {rawHTML ? (
        <NoteBodyText
          dangerouslySetInnerHTML={{ __html: rawHTML }}
          css={{ whiteSpace: 'normal' }}
        />
      ) : (
        <NoteBodyText>{body}</NoteBodyText>
      )}
    </Segment>
  )
}
