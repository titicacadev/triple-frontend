import { Segment, Text } from '@titicaca/core-elements'
import styled from 'styled-components'

const StyledSegment = styled(Segment)`
  margin: 30px;
`

const NoteBodyText = styled(Text).attrs({
  size: 'small',
  color: 'gray',
  alpha: 0.8,
  lineHeight: 1.57,
})``

const MarkdownText = styled(NoteBodyText)`
  white-space: normal;

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
    <StyledSegment>
      <Text bold size="small" color="gray" lineHeight={1.57}>
        {title}
      </Text>
      {rawHTML ? (
        <MarkdownText dangerouslySetInnerHTML={{ __html: rawHTML }} />
      ) : (
        <NoteBodyText>{body}</NoteBodyText>
      )}
    </StyledSegment>
  )
}
