import {
  ListingAttraction,
  ListingRestaurant,
} from '@titicaca/type-definitions'

export type NearByPoiType = 'attraction' | 'restaurant'
export type ListingPoi = ListingAttraction | ListingRestaurant
