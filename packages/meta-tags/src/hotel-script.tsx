import Head from 'next/head'

import { addSchemaType, filterValidValue } from './utils'

interface HotelScriptProps {
  name: string
  description?: string
  url: string
  priceRange?: string
  address: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  telephone?: string
  image?: string
  hasMap?: string
  rating?: {
    bestRating?: number
    worstRating?: number
    reviewCount: number
    ratingValue: number
  }
  geo?: {
    lat: string
    lon: string
  }
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
  })

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(hotelScript)}</script>
    </Head>
  )
}
