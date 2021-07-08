import React, { PropsWithChildren } from 'react'
import { purple, mint } from '@titicaca/color-palette'

import { CircleMarker } from '.'

/**
 * TODO:
 * TF 에 통합하면서 타이핑 변경이 필요합니다.
 */
type MarkerType = 'attraction' | 'restaurant' | 'hotel' | 'tna'

function getColorOfType(type: MarkerType) {
  switch (type) {
    case 'hotel':
      return mint
    case 'restaurant':
      /** TODO: move to color-palette */
      return 'rgba(255, 97, 104, 1)'
    case 'attraction':
      return purple
    case 'tna':
      return 'rgba(255, 130, 36, 1)'
  }

  throw new Error('Unknown color of content type')
}

/**
 * History: Asset의 네이밍 컨벤션이 '-' => '_' 로 변경 되었습니다.
 * 해당 PR: https://github.com/titicacadev/triple-web-assets/pull/150
 */
function getActivePinImageUrl(type: MarkerType) {
  return `https://assets.triple.guide/images/img_map_${type}_timetable_pick@3x.png`
}

/**
 * CircleMarker 에 color 와 pin background-image 를 결정하는 로직을 분리하고
 * poi.type 을 기준으로 컴포넌트의 색상과 pin background-image 를 자유롭게 설정하기 위한
 * High Order Component
 *
 * @param param0
 *
 *  Usage
 *  const HotelCirlceMarker = withTypeCircleMarker('hotel')
 *  const AttractionCirlceMarker = withTypeCircleMarker('attraction')
 *  const RestaurantCirlceMarker = withTypeCircleMarker('restaurant')
 */

type HoCProps = Omit<Parameters<typeof CircleMarker>[0], 'color' | 'src'>

export default function withTypeCircleMarker(type: MarkerType) {
  const color = getColorOfType(type)
  const src = getActivePinImageUrl(type)

  return function ColorMarkerComponent({
    children,
    ...rest
  }: PropsWithChildren<HoCProps>) {
    return (
      <CircleMarker {...rest} color={color} src={src}>
        {children}
      </CircleMarker>
    )
  }
}
