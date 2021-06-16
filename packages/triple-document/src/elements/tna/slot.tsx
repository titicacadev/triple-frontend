import React, { useCallback, useState } from 'react'
import { Container, H1, List, Button } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { gray50 } from '@titicaca/color-palette'

import { TNAProductData } from './types'
import { TnaProductWithPrice } from './product'

export default function Slot({
  id: slotId,
  title: slotTitle,
  products,
  onClick,
  onIntersect,
}: {
  id?: number
  title: string
  products: TNAProductData[]
  onClick: (
    e: React.SyntheticEvent,
    product: TNAProductData,
    index: number,
  ) => void
  onIntersect: (product: TNAProductData, index: number) => void
}) {
  const { trackEvent } = useEventTrackingContext()

  const [showMore, setShowMore] = useState(false)

  const handleShowMoreClick = useCallback(() => {
    trackEvent({
      ga: ['투어티켓_더보기'],
      fa: {
        action: '투어티켓_더보기',
        slot_id: slotId,
      },
    })

    setShowMore(true)
  }, [trackEvent, slotId])

  return (
    <Container
      margin={{ top: 30, left: 30, right: 30 }}
      id={`tna-slot-${slotId}`}
    >
      <H1 margin={{ bottom: 20 }}>{slotTitle}</H1>

      <List clearing verticalGap={40} divided dividerColor={gray50}>
        {(showMore ? products : products.slice(0, 3)).map((product, i) => (
          <List.Item key={i}>
            <TnaProductWithPrice
              index={i}
              product={product}
              onClick={onClick}
              onIntersect={onIntersect}
            />
          </List.Item>
        ))}
      </List>

      {!showMore && products.length > 3 ? (
        <Button
          basic
          fluid
          compact
          size="small"
          margin={{ top: 20 }}
          onClick={handleShowMoreClick}
        >
          더보기
        </Button>
      ) : null}
    </Container>
  )
}
