import withTypeCircleMarker from './with-type-circle-marker'

export * from './circle-marker'
export * from './with-type-circle-marker'

/** Hotel Poi 용 pre-defined CircleMarker */
export const HotelCircleMarker = withTypeCircleMarker('hotel')
export const AttractionCircleMarker = withTypeCircleMarker('attraction')
export const RestaurantCircleMarker = withTypeCircleMarker('restaurant')
export const AttractionCirlceMarker = withTypeCircleMarker('attraction') // TODO: delete
export const RestaurantCirlceMarker = withTypeCircleMarker('restaurant') // TODO: delete
export const TnaCircleMarker = withTypeCircleMarker('tna')
