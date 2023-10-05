import { Segment, Text } from '@titicaca/core-elements'

export default function Note({
  value: { title, body },
}: {
  value: { title: string; body: string }
}) {
  return (
    <Segment css={{ margin: 30 }}>
      <Text bold size="small" color="gray" lineHeight={1.57}>
        {title}
      </Text>
      <Text size="small" color="gray" alpha={0.8} lineHeight={1.57}>
        {body}
      </Text>
    </Segment>
  )
}
