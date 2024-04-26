import { useMemo } from 'react'
import {
  TransportationType,
  Itinerary,
  ItineraryItemType,
} from '@titicaca/content-type-definitions'
import { GuestModeType } from '@titicaca/type-definitions'

import {
  deriveNameFromTranslations,
  UnSafetyTranslations,
} from './use-safety-poi'
import { ItineraryElementType } from './types'

interface Props {
  itinerary: Itinerary
  guestMode?: GuestModeType
}

interface Course {
  id: string
  /** 지역아이디 */
  regionId: string
  /** POI 제목, 공백값 가드닝 적용 */
  name: string
  /** 추천코스 요소 타입 */
  type: ItineraryElementType
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
export default function useItinerary({ itinerary, guestMode }: Props) {
  const { day, items, hideAddButton } = itinerary

  const hasItineraries = items.length > 0
  /** NOTE: 일정을 일정판에 저장하기 위해 regionId 를 특정하기 위한 로직 */
  const regionId = extractRegionId(items)

  const itemIds = useMemo(
    () => items.map((item) => (item.poi ? item.poi.id : item.festa.id)),
    [items],
  )

  const courses = useMemo<Course[]>(() => {
    return items.map(
      ({ poi, festa, memo, schedule, transportation: raw }, i) => {
        const transportation = raw?.[0]?.value || DEFAULT_TRANSPORTATION

        const base = {
          ...transportation,
          memo,
          schedule,
          isFirst: i === 0,
          isLast: items.length - 1 === i,
        }

        if (poi) {
          const { id, type, categories: gqlCategories, source } = poi
          const name = deriveNameFromTranslations(
            source?.names as UnSafetyTranslations,
          )

          const categoryNames = (gqlCategories || source?.categories || [])
            .map((category) => category.name)
            .join(',')

          const areaNames =
            regionId &&
            source?.regionId &&
            source?.areas &&
            source.areas.length > 0
              ? source.areas.map((area) => area.name).join(',')
              : guestMode === 'seoul-con'
                ? null
                : source?.vicinity

          const description = [categoryNames, areaNames]
            .filter((i) => i)
            .join(' · ')

          return {
            ...base,
            id,
            regionId: regionId || source?.regionId || '',
            name,
            type,
            description,
          }
        } else {
          const { id, title, category, regions } = festa

          const regionNames = regions[0]?.names
          const regionName = deriveNameFromTranslations(regionNames ?? {})

          const description = [category, regionName]
            .filter((i) => i)
            .join(' · ')

          return {
            ...base,
            id,
            regionId: regionId || regions[0]?.id || '',
            name: title,
            type: 'festa',
            description,
          }
        }
      },
    )
  }, [items, regionId, guestMode])

  return {
    day,
    items,
    courses,
    regionId,
    itemIds,
    hasItineraries,
    hideAddButton,
  }
}

function extractRegionId(items: ItineraryItemType[]) {
  for (const item of items) {
    if (item.poi && item.poi.source?.regionId) {
      return item.poi.source.regionId
    }

    if (item.festa && item.festa.regions[0]?.id) {
      return item.festa.regions[0].id
    }
  }

  return null
}
