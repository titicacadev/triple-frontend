import Head from 'next/head'

import { createScript } from './utils'
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
  aggregateRating?: AggregateRatingSchema
  geo?: GeoSchema
  reviews?: ReviewSchema[]
}

export function HotelScript(props: HotelScriptProps) {
  const hotelScript = createScript(props, 'Hotel')

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(hotelScript)}</script>
    </Head>
  )
}
