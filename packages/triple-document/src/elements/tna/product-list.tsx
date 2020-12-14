import React, { useCallback, useEffect, useState } from 'react'
import { HR2, Container, H1, List, Button } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { TnaProductData, TnaProduct } from './tna'

interface TnaProductsListProps {
  value: {
    slotId?: number
  }
  onTNAProductsFetch?: (slotId?: number) => Promise<Response>
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: TnaProductData,
    slotId?: number,
    index?: number,
  ) => void
}

interface TnaProductsListState {
  products: TnaProductData[]
  showMore: boolean
  title: string
}

export function TnaProductsList({
  onTNAProductsFetch,
  onTNAProductClick,
  value: { slotId },
}: TnaProductsListProps) {
  const [{ products, showMore, title }, setProductsList] = useState<
    TnaProductsListState
  >({
    products: [],
    showMore: false,
    title: '',
  })

  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()

  useEffect(() => {
    async function fetchAndSetProductsList() {
      if (!onTNAProductsFetch || !slotId) {
        return
      }

      const response = await onTNAProductsFetch(slotId)

      if (response.ok) {
        const {
          title,
          products,
        }: {
          title: string
          products?: TnaProductData[]
        } = await response.json()

        setProductsList({ title, products: products || [], showMore: false })
      }
    }

    fetchAndSetProductsList()
  }, [onTNAProductsFetch, slotId, setProductsList])

  const handleClick = useCallback(
    (e: React.SyntheticEvent, product: TnaProductData, index: number) => {
      if (onTNAProductClick) {
        onTNAProductClick(e, product, slotId, index)
      }
    },
    [onTNAProductClick, slotId],
  )

  const handleIntersect = useCallback(
    (product: TnaProductData, index: number) => {
      trackEvent({
        fa: {
          action: '투어티켓_노출',
          slot_id: slotId,
          tna_id: product.id,
          position: index,
        },
      })
    },
    [trackEvent, slotId],
  )

  const handleShowMoreClick = useCallback(() => {
    trackSimpleEvent({
      action: '투어티켓_더보기',
      slot_id: slotId,
    })

    setProductsList((prevValues) => ({
      ...prevValues,
      showMore: true,
    }))
  }, [trackSimpleEvent, setProductsList, slotId])

  return products.length > 0 ? (
    <>
      <HR2 />
      <Container
        margin={{ top: 30, left: 30, right: 30 }}
        id={`tna-slot-${slotId}`}
      >
        <H1 margin={{ bottom: 20 }}>{title}</H1>

        <List clearing verticalGap={20}>
          {(showMore ? products : products.slice(0, 3)).map((product, i) => (
            <List.Item key={i}>
              <TnaProduct
                index={i}
                product={product}
                onClick={handleClick}
                onIntersect={handleIntersect}
              />
            </List.Item>
          ))}
          {!showMore && products.length > 3 ? (
            <Button
              basic
              fluid
              compact
              size="small"
              margin={{ top: 10 }}
              onClick={handleShowMoreClick}
            >
              더보기
            </Button>
          ) : null}
        </List>
      </Container>
    </>
  ) : null
}
