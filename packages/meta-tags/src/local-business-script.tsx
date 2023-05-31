import Head from 'next/head'

import { addSchemaType, filterValidValue, formatReviews } from './utils'
import {
  AggregateRatingSchema,
  AddressSchema,
  GeoSchema,
  ReviewSchema,
} from './types'

const POI_TO_LOCAL_BUSINESS_TYPE_MAP = {
  restaurant: 'FoodEstablishment',
  attractions: 'LocalBusiness',
}

interface LocalBusinessScriptProps {
  type: keyof typeof POI_TO_LOCAL_BUSINESS_TYPE_MAP
  name: string
  description?: string
  image?: string
  url?: string
  telephone?: string
  address: AddressSchema
  rating: AggregateRatingSchema
  geo?: GeoSchema
  menu?: string
  review: ReviewSchema[]
  priceRange?: string
  servesCuisine?: string[]
}

export function LocalBusinessScript({
  type,
  name,
  description,
  rating,
  image,
  address,
  review,
  geo,
  url,
  telephone,
  priceRange,
  servesCuisine,
}: LocalBusinessScriptProps) {
  const localBusinessScript = filterValidValue({
    '@context': 'http://schema.org',
    '@type': POI_TO_LOCAL_BUSINESS_TYPE_MAP[type],
    name,
    description,
    image,
    address: addSchemaType(filterValidValue(address), 'PostalAddress'),
    aggregateRating: addSchemaType(filterValidValue(rating), 'AggregateRating'),
    review: formatReviews(review),
    geo: addSchemaType(geo, 'GeoCoordinates'),
    url,
    telephone,
    priceRange,
    servesCuisine,
  })

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessScript)}
      </script>
    </Head>
  )
}
