import React, { useEffect, useState } from 'react'
import { HR2 } from '@titicaca/core-elements'
import { get } from '@titicaca/fetcher'

import { TNAProductsResponse } from './types'
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
}

export function TNAProducts({ value: { slotId } }: TnaProductsListProps) {
  const { products, title } = useProducts({
    slotId,
  })

  return products.length > 0 ? (
    <>
      <HR2 />
      <Slot id={slotId} title={title} products={products} />
    </>
  ) : null
}
