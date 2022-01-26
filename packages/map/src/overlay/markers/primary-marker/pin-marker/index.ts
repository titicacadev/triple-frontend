import { PinWithCircleMarker } from './pin-marker'

export * from './pin-marker'

/** 공통으로 사용되는 poi 마커 */
export const HotelCircleMarker = PinWithCircleMarker('hotel')
export const AttractionCircleMarker = PinWithCircleMarker('attraction')
export const RestaurantCircleMarker = PinWithCircleMarker('restaurant')
export const TnaCircleMarker = PinWithCircleMarker('tna')
