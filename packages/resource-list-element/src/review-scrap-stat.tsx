import { useTranslation } from '@titicaca/next-i18next'
import { Container, Rating } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'

import ResourceListElementStats from './resource-list-element-stats'

function ReviewScrapStat({
  reviewsCount,
  scrapsCount,
  reviewsRating,
  ...containerProps
}: Parameters<typeof Container>[0] & {
  reviewsRating: number | undefined
  reviewsCount: number | undefined
  scrapsCount: number | undefined
}) {
  const { t } = useTranslation('common-web')

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
            ? t(
                [
                  'jeojang-formattedscrapscount',
                  '저장 {{formattedScrapsCount}}',
                ],
                { formattedScrapsCount },
              )
            : null,
        ]}
        inline
        size="tiny"
        alpha={0.4}
      />
    </Container>
  )
}

export default ReviewScrapStat
