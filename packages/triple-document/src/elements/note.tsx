import { Segment, Text } from '@titicaca/core-elements'
import { marked } from 'marked'
import styled from 'styled-components'

const Markdown = styled(Text)`
  a {
    text-decoration: underline;
    color: var(--color-blue);
  }
`

export default function Note({
  value: { title, body, markdownText },
}: {
  value: { title: string; body?: string; markdownText?: string }
}) {
  const html = body || marked.parse(markdownText || '')

  return (
    <Segment css={{ margin: 30 }}>
      <Text bold size="small" color="gray" lineHeight={1.57}>
        {title}
      </Text>
      <Markdown
        size="small"
        color="gray"
        alpha={0.8}
        lineHeight={1.57}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Segment>
  )
}
