import React, { useCallback, useEffect, useState } from 'react'
import { HR2 } from '@titicaca/core-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { get } from '@titicaca/fetcher'

import { TNAProductData, TNAProductsResponse } from './types'
import { Slot } from './slot'

function useProducts({ slotId }: { slotId?: number }): TNAProductsResponse {
  const [response, setProductsList] = useState<TNAProductsResponse>({
    products: [],
    title: '',
  })

  useEffect(() => {
    async function fetchAndSetProductsList() {
      if (!slotId) {
        return
      }

      const { ok, result } = await get<TNAProductsResponse>(
        `/api/tna-v2/slots/${slotId}`,
      )

      if (ok) {
        const { title, products } = result || {}

        setProductsList({
          title: title || '',
          products: products || [],
        })
      }
    }

    fetchAndSetProductsList()
  }, [slotId])
  return response
}

interface TnaProductsListProps {
  value: {
    slotId?: number
  }
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: TNAProductData,
    slotId?: number,
    index?: number,
  ) => void
}

export function TNAProducts({
  onTNAProductClick,
  value: { slotId },
}: TnaProductsListProps) {
  const { trackEvent } = useEventTrackingContext()
  const { products, title } = useProducts({
    slotId,
  })

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

  return products.length > 0 ? (
    <>
      <HR2 />
      <Slot
        id={slotId}
        title={title}
        products={products}
        onClick={handleClick}
        onIntersect={handleIntersect}
      />
    </>
  ) : null
}
