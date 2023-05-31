import Head from 'next/head'

import { addSchemaType, filterValidValue, formatReviews } from './utils'
import {
  AddressSchema,
  AggregateRatingSchema,
  GeoSchema,
  ReviewSchema,
} from './types'

interface HotelScriptProps {
  name: string
  description?: string
  url: string
  address: AddressSchema
  priceRange?: string
  telephone?: string
  image?: string
  hasMap?: string
  rating?: AggregateRatingSchema
  geo?: GeoSchema
  reviews?: ReviewSchema[]
}

export function HotelScript({
  name,
  description,
  url,
  priceRange,
  address,
  image,
  hasMap,
  rating,
  geo,
  reviews,
}: HotelScriptProps) {
  const hotelScript = filterValidValue({
    '@context': 'http://schema.org',
    '@type': 'Hotel',
    name,
    description,
    url,
    priceRange,
    address: addSchemaType(filterValidValue(address), 'PostalAddress'),
    image,
    hasMap,
    aggregateRating: addSchemaType(filterValidValue(rating), 'AggregateRating'),
    geo: addSchemaType(geo, 'GeoCoordinates'),
    reviews: formatReviews(reviews),
  })

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(hotelScript)}</script>
    </Head>
  )
}
