import Head from 'next/head'

import { addSchemaType, filterValidValue } from './utils'
import { AggregateRatingSchema, AggregateOfferSchema } from './types'

interface ProductScriptProps {
  name: string
  description?: string
  image?: string
  rating?: AggregateRatingSchema
  offers: AggregateOfferSchema
}

export function ProductScript({
  name,
  description,
  rating,
  offers,
  image,
}: ProductScriptProps) {
  const productScript = filterValidValue({
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    aggregateRating: rating
      ? addSchemaType(filterValidValue(rating), 'AggregateRating')
      : undefined,
    offers: addSchemaType(filterValidValue(offers), 'AggregateOffer'),
  })

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(productScript)}
      </script>
    </Head>
  )
}
