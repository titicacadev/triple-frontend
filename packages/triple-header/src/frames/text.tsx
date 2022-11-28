import { Container, Text } from '@titicaca/core-elements'

interface TextFrame {
  value: {
    text: string
  }
  onFrameClick?: () => void
}

export default function TextFrame({
  value: { text },
  onFrameClick,
}: TextFrame) {
  return (
    <Container onClick={onFrameClick}>
      <Text>{text}</Text>
    </Container>
  )
}
