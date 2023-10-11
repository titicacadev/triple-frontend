import { Segment, Text } from '@titicaca/kint5-core-elements'

export default function Note({
  value: { title, body },
}: {
  value: { title: string; body: string }
}) {
  return (
    <Segment
      css={{
        margin: '30px 0',
        borderRadius: 16,
        backgroundColor: 'var(--color-kint5-gray20)',
      }}
    >
      <Text css={{ fontSize: 14, fontWeight: 700 }}>{title}</Text>
      <Text css={{ fontSize: 14, fontWeight: 400, marginTop: 12 }}>{body}</Text>
    </Segment>
  )
}
