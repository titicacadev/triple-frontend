import {
  ListingAttraction,
  ListingRestaurant,
} from '@titicaca/type-definitions'

export type PoiType = 'attraction' | 'restaurant'
export type ListingPOI = ListingAttraction | ListingRestaurant
