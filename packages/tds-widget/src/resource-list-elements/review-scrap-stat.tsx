import { useTranslation } from '@titicaca/triple-web'
import { Container, Rating } from '@titicaca/tds-ui'
import { formatNumber } from '@titicaca/view-utilities'

import { ResourceListElementStats } from './resource-list-element-stats'

export function ReviewScrapStat({
  reviewsCount,
  scrapsCount,
  reviewsRating,
  ...containerProps
}: Parameters<typeof Container>[0] & {
  reviewsRating: number | undefined
  reviewsCount: number | undefined
  scrapsCount: number | undefined
}) {
  const t = useTranslation()

  if (!reviewsCount && !scrapsCount) {
    return null
  }

  const formattedScrapsCount = formatNumber(scrapsCount)

  return (
    <Container {...containerProps}>
      {reviewsCount ? (
        <Rating verticalAlign="middle" size="tiny" score={reviewsRating} />
      ) : null}

      <ResourceListElementStats
        stats={[
          reviewsCount ? `(${formatNumber(reviewsCount)})` : null,
          scrapsCount
            ? t('저장 {{formattedScrapsCount}}', { formattedScrapsCount })
            : null,
        ]}
        inline
        size="tiny"
        alpha={0.4}
      />
    </Container>
  )
}
