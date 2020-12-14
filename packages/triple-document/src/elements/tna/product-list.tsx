import React, { useCallback, useEffect, useState } from 'react'
import { HR2, Container, H1, List, Button } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { TnaProduct } from './product'
import { TNAProductData } from './types'

type ProductsFetcher = (slotId?: number) => Promise<Response>

interface TNAProductsResponse {
  products: TNAProductData[]
  title: string
}

function useProducts({
  slotId,
  fetcher,
}: {
  slotId?: number
  fetcher?: ProductsFetcher
}): TNAProductsResponse {
  const [response, setProductsList] = useState<TNAProductsResponse>({
    products: [],
    title: '',
  })

  useEffect(() => {
    async function fetchAndSetProductsList() {
      if (!fetcher || !slotId) {
        return
      }

      const response = await fetcher(slotId)

      if (response.ok) {
        const {
          title,
          products,
        }: {
          title: string
          products?: TNAProductData[]
        } = await response.json()

        setProductsList({ title, products: products || [] })
      }
    }

    fetchAndSetProductsList()
  }, [fetcher, slotId])
  return response
}

interface TnaProductsListProps {
  value: {
    slotId?: number
  }
  onTNAProductsFetch?: ProductsFetcher
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: TNAProductData,
    slotId?: number,
    index?: number,
  ) => void
}

export function TnaProductsList({
  onTNAProductsFetch,
  onTNAProductClick,
  value: { slotId },
}: TnaProductsListProps) {
  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()
  const { products, title } = useProducts({
    slotId,
    fetcher: onTNAProductsFetch,
  })
  const [showMore, setShowMore] = useState(false)

  const handleClick = useCallback(
    (e: React.SyntheticEvent, product: TNAProductData, index: number) => {
      if (onTNAProductClick) {
        onTNAProductClick(e, product, slotId, index)
      }
    },
    [onTNAProductClick, slotId],
  )

  const handleIntersect = useCallback(
    (product: TNAProductData, index: number) => {
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

    setShowMore(true)
  }, [trackSimpleEvent, slotId])

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
