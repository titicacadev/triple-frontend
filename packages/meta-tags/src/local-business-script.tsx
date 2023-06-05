import Head from 'next/head'

import { createScript } from './utils'
import {
  AggregateRatingSchema,
  AddressSchema,
  GeoSchema,
  ReviewSchema,
  OpeningHoursSpecificationSchema,
} from './types'

const POI_TO_LOCAL_BUSINESS_TYPE_MAP = {
  restaurant: 'FoodEstablishment',
  attraction: 'LocalBusiness',
  hotel: 'Hotel',
}

interface LocalBusinessScriptProps {
  type: keyof typeof POI_TO_LOCAL_BUSINESS_TYPE_MAP
  name: string
  description?: string
  image?: string
  url?: string
  telephone?: string
  address: AddressSchema
  aggregateRating?: AggregateRatingSchema
  geo?: GeoSchema
  menu?: string[]
  servesCuisine?: string[]
  review?: ReviewSchema[]
  priceRange?: string
  openingHoursSpecification?: OpeningHoursSpecificationSchema[]
}

export function LocalBusinessScript({
  type,
  ...props
}: LocalBusinessScriptProps) {
  const localBusinessScript = createScript(
    props,
    POI_TO_LOCAL_BUSINESS_TYPE_MAP[type],
  )

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessScript)}
      </script>
    </Head>
  )
}
