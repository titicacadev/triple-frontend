import React from 'react'
import { Container, Rating } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'

import ResourceListElementStats from './stats'

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

      <ResourceListElementStats inline size="tiny" alpha={0.4}>
        {reviewsCount ? <span>({formatNumber(reviewsCount)})</span> : null}
        {scrapsCount ? <span>저장 {formatNumber(scrapsCount)}</span> : null}
      </ResourceListElementStats>
    </Container>
  )
}
