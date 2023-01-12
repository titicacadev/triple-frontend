import { useTranslation } from '@titicaca/next-i18next'
import { Container, HR1, Text } from '@titicaca/core-elements'

export default function NotExistReplies() {
  const { t } = useTranslation('common-web')

  return (
    <>
      <HR1
        color="var(--color-gray50)"
        compact
        css={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}
      />

      <Container
        css={{
          padding: '40px 0 50px',
          textAlign: 'center',
        }}
      >
        <Text size={14} lineHeight={1.2} color="gray300">
          {t([
            'ajig-daesgeuli-eobseoyo.-gajang-meonjeo-daesgeuleul-jagseonghaeboseyo',
            '아직 댓글이 없어요.\n가장 먼저 댓글을 작성해보세요!',
          ])}
        </Text>
      </Container>

      <HR1 color="var(--color-gray50)" compact />
    </>
  )
}
