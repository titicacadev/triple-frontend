import { useMemo } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import { Translations } from '@titicaca/content-type-definitions'

type SafetyPoi<T> = T & {
  /** POI Name: primary || ko || en || local || '' */
  safeName: string
  /** Large Size Image Url */
  defaultImage?: string
}

/**
 * POI 의 names 에 대한 타입정의가
 * triple-frontend 와 triple-content 가 서로 다른 이슈가 있어 triple-content 쪽으로
 * 맞추기 위해 아래의 타입을 추가합니다.
 */
export type UnSafetyTranslations = Translations & { primary?: string }

export function getSafetyPoiName({
  primary,
  /** will be @deprecated */
  ko,
  en,
  local,
}: UnSafetyTranslations): string {
  return primary || ko || en || local || ''
}

type ImageSizeType = keyof ImageMeta['sizes']

export function getImage(
  image?: ImageMeta,
  type?: ImageSizeType,
): string | undefined {
  return image ? (type ? image?.sizes[type].url : '') : undefined
}

/**
 * Usage
 *
 * import { useSafetyPoi } from 'use-safety-poi'
 *
 * const { ...data, safeName, defaultImage } = useSafetyPoi<T>(data)
 * const { ...hotel, safeName, defaultImage } = useSafetyPoi<HotelDetailResponse>(hotel)
 * const { ...hotel, safeName, defaultImage } = useSafetyPoi<HotelResponse>(hotel)
 *
 * 경우에 따라 Poi 데이터 구조가 source 를 기반으로 하는 경우가 있어서 두가지 모두 가능
 *
 * { id, names, ...rest }  -> {id, names, safeName, defaultImage, ...rest }
 * or
 * { id, source: { names }, ...rest } -> {id, names, source: { names }, safeName, defaultImage, ...rest}
 *
 * Purpose
 * 1.
 * 2. Refine(Safety) unstable poi data structure
 * 3. safe prefix 는 optional 할 수 있는 값(unsafe)이 required 타입으로 변환을 의미
 *
 * TODO:
 * - [ ] poi must be required 😭
 *
 * NOTE:
 * -
 */

export function useSafetyPoi<
  T extends {
    image?: ImageMeta
    names?: UnSafetyTranslations
    source?: { names: UnSafetyTranslations; image?: ImageMeta }
  },
>(poi: T | undefined): SafetyPoi<T> {
  return useMemo<SafetyPoi<T>>(() => {
    const { names, source, image } =
      poi ||
      ({
        names: undefined,
        source: undefined,
        image: undefined,
      } as T)

    if (source) {
      const { names, image } = source

      return {
        ...poi,
        defaultImage: getImage(image, 'large'),
        safeName: getSafetyPoiName(names),
      } as SafetyPoi<T>
    }

    return {
      ...poi,
      defaultImage: image && getImage(image, 'large'),
      safeName: names ? getSafetyPoiName(names as UnSafetyTranslations) : '',
    } as SafetyPoi<T>
  }, [poi])
}
