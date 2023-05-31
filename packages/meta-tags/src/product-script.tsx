import Head from 'next/head'

import { addSchemaType, filterValidValue, formatReviews } from './utils'
import {
  AggregateRatingSchema,
  AggregateOfferSchema,
  ReviewSchema,
} from './types'

interface ProductScriptProps {
  name: string
  description?: string
  image?: string
  rating?: AggregateRatingSchema
  offers: AggregateOfferSchema
  reviews?: ReviewSchema[]
}

export function ProductScript({
  name,
  description,
  rating,
  offers,
  image,
  reviews,
}: ProductScriptProps) {
  const productScript = filterValidValue({
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    aggregateRating: addSchemaType(filterValidValue(rating), 'AggregateRating'),
    offers: addSchemaType(
      filterValidValue({
        ...offers,
        availability: offers.availability
          ? `https://schema.org/${offers.availability}`
          : undefined,
      }),
      'AggregateOffer',
    ),
    review: formatReviews(reviews),
  })

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(productScript)}
      </script>
    </Head>
  )
}
