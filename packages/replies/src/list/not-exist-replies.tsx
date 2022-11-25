import { Container, HR1, Text } from '@titicaca/core-elements'

export default function NotExistReplies() {
  return (
    <>
      <HR1
        margin={{ top: 20, left: 30, right: 30 }}
        color="var(--color-gray50)"
      />

      <Container padding={{ top: 40, bottom: 50 }} textAlign="center">
        <Text size={14} lineHeight={1.2} color="gray300">
          아직 댓글이 없어요. <br />
          가장 먼저 댓글을 작성해보세요!
        </Text>
      </Container>

      <HR1 margin={{ top: 0 }} color="var(--color-gray50)" />
    </>
  )
}
