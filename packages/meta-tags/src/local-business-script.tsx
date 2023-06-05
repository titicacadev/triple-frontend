import Head from 'next/head'

import { SCHEMA_SCRIPT_TYPE_MAP, createScript } from './utils'
import {
  AggregateRatingSchema,
  AddressSchema,
  GeoSchema,
  ReviewSchema,
  OpeningHoursSpecificationSchema,
} from './types'

interface LocalBusinessScriptProps {
  type: keyof Omit<typeof SCHEMA_SCRIPT_TYPE_MAP, 'tna'>
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
  review?: Omit<ReviewSchema, 'itemReviewed'>[]
  priceRange?: string
  openingHoursSpecification?: OpeningHoursSpecificationSchema[]
}

export function LocalBusinessScript({
  type,
  ...props
}: LocalBusinessScriptProps) {
  const localBusinessScript = createScript(props, SCHEMA_SCRIPT_TYPE_MAP[type])

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessScript)}
      </script>
    </Head>
  )
}
