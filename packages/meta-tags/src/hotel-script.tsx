import Head from 'next/head'

import { addSchemaType, filterValidValue } from './utils'
import { AddressSchema, AggregateRatingSchema, GeoSchema } from './types'

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
    aggregateRating: rating
      ? addSchemaType(filterValidValue(rating), 'AggregateRating')
      : undefined,
    geo: geo ? addSchemaType(geo, 'GeoCoordinates') : undefined,
  })

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(hotelScript)}</script>
    </Head>
  )
}
