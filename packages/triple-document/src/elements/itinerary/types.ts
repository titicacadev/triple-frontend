import type { ListingContentPoi, GeoPoint } from '@titicaca/content-utilities'
import { PoiType } from '@titicaca/type-definitions'

/**
 * TODO: triple-content 쪽으로 union 시킵니다.
 */

/**
 * 이동수단
 */
export type TransportationType =
  | 'car'
  | 'bus'
  | 'walk'
  | 'plane'
  | 'tram'
  | 'train'
  | 'cable'

/**
 * 추천코스 일정간에 이동수단과 이동시간에 대한 정보
 */
export interface Transportation {
  type: 'transportation'
  value: {
    /** 이동수단 */
    transportation: TransportationType
    /** 이동에 필요한 시간 */
    duration: string
  }
}

/**
 * pointGeolocation 값이 무조건 있도록 설정, article-admin 에서 pointGeolocation 값이
 * 존재하지 않는 POI 는 추천 코스로 추가하지 않도록 처리함
 */
export type ItineraryPoi = ListingContentPoi & {
  type: PoiType
  source: ListingContentPoi['source'] & { pointGeolocation: GeoPoint }
}

export interface ItineraryItemType {
  /** 추천일정 POI 에 관리자가 추가한 메모 */
  memo?: string
  /** 일정 POI 에 도착시간 */
  schedule?: string
  /** 이동 수단 및 이동 예상시간 */
  transportation?: Transportation[]
  poi: ItineraryPoi
}

export interface Itinerary {
  day: number
  /** 일정 항목 리스트 */
  items: ItineraryItemType[]
}

export interface DocumentItinerary {
  type: 'itinerary'
  value: {
    itinerary: Itinerary
  }
}
