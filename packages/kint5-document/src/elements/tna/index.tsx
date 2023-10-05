import { useEffect, useState } from 'react'
import { HR2 } from '@titicaca/core-elements'
import { get } from '@titicaca/fetcher'

import { TnaProductsResponse } from './types'
import { Slot } from './slot'

function useProducts({ slotId }: { slotId?: number }): TnaProductsResponse {
  const [response, setProductsList] = useState<TnaProductsResponse>({
    products: [],
    title: '',
  })

  useEffect(() => {
    async function fetchAndSetProductsList() {
      if (!slotId) {
        return
      }

      const response = await get<TnaProductsResponse>(
        `/api/tna-v2/slots/${slotId}`,
      )

      if (response.ok) {
        const {
          parsedBody: { title, products },
        } = response

        setProductsList({ title, products })
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

export function TnaProducts({ value: { slotId } }: TnaProductsListProps) {
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
