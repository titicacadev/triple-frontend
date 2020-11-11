import React from 'react'
import { Container, Rating } from '@titicaca/core-elements'
import { useScrapsContext } from '@titicaca/react-contexts'
import { formatNumber } from '@titicaca/view-utilities'

import ResourceListElementStats from './stats'

export default function ReviewScrapStat({
  reviewsCount,
  scrapsCount: rawScrapsCount,
  reviewsRating,
  id,
  scraped,
  ...containerProps
}: Parameters<typeof Container>[0] & {
  id: string
  scraped: boolean
  reviewsRating: number | undefined
  reviewsCount: number | undefined
  scrapsCount: number | undefined
}) {
  const { deriveCurrentStateAndCount } = useScrapsContext()
  const { scrapsCount } = deriveCurrentStateAndCount({
    id,
    scraped,
    scrapsCount: rawScrapsCount,
  })

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
