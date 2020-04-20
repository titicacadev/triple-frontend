import React from 'react'
import { Container, Rating, Text } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'

export default function ReviewScrapStat({
  reviewsCount,
  scrapsCount,
  reviewsRating,
  ...containerProps
}: Parameters<typeof Container>[0] & {
  reviewsRating: number | undefined
  reviewsCount: number | undefined
  scrapsCount: number | undefined
}) {
  if (!reviewsCount && !scrapsCount) {
    return null
  }

  return (
    <Container {...containerProps}>
      {reviewsCount ? (
        <Rating verticalAlign="middle" size="tiny" score={reviewsRating} />
      ) : null}

      <Text inline size="tiny" alpha={0.4}>
        {[
          reviewsCount ? `(${formatNumber(reviewsCount)})` : null,
          scrapsCount ? `저장 ${formatNumber(scrapsCount)}` : null,
        ]
          .filter((count) => count)
          .join(' · ')}
      </Text>
    </Container>
  )
}
