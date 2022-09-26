import { useMemo } from 'react'
import {
  TransportationType,
  Itinerary,
  ItineraryItemType,
} from '@titicaca/content-type-definitions'

import { getSafetyPoiName, UnSafetyTranslations } from './use-safety-poi'

interface Props {
  itinerary: Itinerary
}

interface Course {
  id: string
  /** 지역아이디 */
  regionId: string

  /** POI 제목, 공백값 가드닝 적용 */
  name: string
  /** POI 타입 */
  type: ItineraryItemType['poi']['type']
  /** 거점지역, 카테고리 */
  description: string
  /** 이동수단 */
  transportation?: TransportationType
  /** 이동시간 */
  duration?: string
  /** 일정 Poi 에 추가된 관리자 메모 */
  memo?: string
  /** 일정 도착시간 */
  schedule?: string
  /** POI 간 이동거리 */
  isFirst: boolean
  /** 마지막 아이템 판단 */
  isLast: boolean
}

const DEFAULT_TRANSPORTATION = {
  duration: undefined,
  transportation: undefined,
}

/**
 * @param param0 TripleDocument Element Structure
 */
export default function useItinerary({ itinerary }: Props) {
  const { day, items, hideAddButton } = itinerary

  const hasItineraries = items.length > 0
  /** NOTE: 일정을 일정판에 저장하기 위해 regionId 를 특정하기 위한 로직 */
  const regionId = items[0]?.poi.source?.regionId

  const poiIds = useMemo(() => items.map(({ poi }) => poi.id), [items])

  const courses = useMemo<Course[]>(() => {
    return items.map(({ poi, memo, schedule, transportation: raw }, i) => {
      const { id, type, categories: gqlCategories, source } = poi
      /** NOTE: 이동수단(walk, bus, car) 은 여러개 일 수 있으나 화면에는 첫번째 것을 표시 */
      const transportation = raw?.[0]?.value || DEFAULT_TRANSPORTATION

      const name = getSafetyPoiName(source?.names as UnSafetyTranslations)

      const categoryNames = (gqlCategories || source?.categories || [])
        .map((category) => category.name)
        .join(',')

      const areaNames =
        regionId && source?.regionId && source?.areas && source.areas.length > 0
          ? source.areas.map((area) => area.name).join(',')
          : source?.vicinity

      const description = [categoryNames, areaNames]
        .filter((i) => i)
        .join(' · ')

      return {
        id,
        regionId: regionId || source?.regionId || '',
        name,
        type,
        description,
        ...transportation,
        memo,
        schedule,
        isFirst: i === 0,
        isLast: items.length - 1 === i,
      }
    })
  }, [items, regionId])

  return {
    day,
    items,
    courses,
    regionId,
    poiIds,
    hasItineraries,
    hideAddButton,
  }
}
