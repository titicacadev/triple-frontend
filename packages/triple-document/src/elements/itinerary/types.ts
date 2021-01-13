import { PoiType } from '@titicaca/pois-utilities'
import {
  ImageMeta,
  PointGeoJSON,
  TranslatedProperty,
} from '@titicaca/type-definitions'

/**
 * 이동수단
 */
export enum TransportationType {
  CAR = 'car',
  BUS = 'bus',
  WALK = 'walk',
  PLANE = 'plane',
  TRAM = 'tram',
  TRAIN = 'train',
  CABLE = 'cable',
}

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
 * FIXME: 규격에 맞는 Poi Type Definition 이 필요하다.
 */
export interface Poi {
  id: string
  type: PoiType
  source: {
    image?: ImageMeta
    names: TranslatedProperty
    regionId: string
    grade: number
    comment?: string
    location: [number, number]
    id: string
    areas?: { name: string }[]
    categories?: { name: string }[]
    hasTnaProducts?: boolean
    type: PoiType
    pointGeolocation: PointGeoJSON
  }
}

export interface Day {
  day: number
  /** 일정 항목 리스트 */
  items: {
    /** 추천일정 POI 에 관리자가 추가한 메모 */
    memo?: string
    /** 일정 POI 에 도착시간 */
    schedule: string
    /** 이동 수단 및 이동 예상시간 */
    transportation?: Transportation[]
    poi: Poi
  }[]
}

/**
 * TODO: move to TF/type-definitions
 */
export interface LatLngLiteral {
  lat: number
  lng: number
}
