import { Container } from '@titicaca/kint5-core-elements'
import { useTranslation } from '@titicaca/next-i18next'

export function KoreanReviewTranslationNotice() {
  const { t } = useTranslation('common-web')

  return (
    <Container
      css={{
        backgroundColor: 'var(--color-kint5-gray20)',
        color: 'var(--color-kint5-gray60)',
        borderRadius: 4,
        margin: '9px 0 32px',
        padding: '11px 0',
        fontSize: 12,
        textAlign: 'center',
      }}
    >
      {t(['현지인 리뷰는 자동 번역되었습니다.'])}
    </Container>
  )
}
