import Head from 'next/head'

import { createScript } from './utils'
import {
  AggregateRatingSchema,
  AggregateOfferSchema,
  ReviewSchema,
} from './types'

interface ProductScriptProps {
  name: string
  description?: string
  image?: string
  aggregateRating?: AggregateRatingSchema
  offers: AggregateOfferSchema
  review?: Omit<ReviewSchema, 'itemReviewed'>[]
}

export function ProductScript(props: ProductScriptProps) {
  const productScript = createScript(props, 'Product')

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(productScript)}
      </script>
    </Head>
  )
}
