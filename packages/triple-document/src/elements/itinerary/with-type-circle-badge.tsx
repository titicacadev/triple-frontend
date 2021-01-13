import React, { PropsWithChildren } from 'react'
import { purple, mint } from '@titicaca/color-palette'

import { CircleBadge } from './badge'

/**
 * TODO:
 * TF 에 통합하면서 타이핑 변경이 필요합니다.
 * - TF/map 컴포넌트의 로직과 중복되는 코드입니다.
 */
type PoiType = 'attraction' | 'restaurant' | 'hotel'

function getColorOfType(type: PoiType) {
  switch (type) {
    case 'hotel':
      return mint
    case 'restaurant':
      /** TODO: move to color-palette */
      return 'rgba(255, 97, 104, 1)'
    case 'attraction':
      return purple
  }

  throw new Error('Unknown color of content type')
}

/**
 * CircleBadge 에 color 결정하는 로직을 분리하고
 * poi.type 을 기준으로 컴포넌트의 색상을 자유롭게 설정하기 위한
 * High Order Component
 *
 * @param param0
 *
 *  Usage
 *  const HotelCirlceBadge = withTypeCircleBadge('hotel')
 *  const AttractionCirlceBadge = withTypeCircleBadge('attraction')
 *  const RestaurantCirlceBadge = withTypeCircleBadge('restaurant')
 */

type HoCProps = Omit<Parameters<typeof CircleBadge>[0], 'color'>

export default function withTypeCircleBadge(type: PoiType) {
  const color = getColorOfType(type)

  return function ColorBadgeComponent({
    children,
    ...rest
  }: PropsWithChildren<HoCProps>) {
    return (
      <CircleBadge {...rest} color={color}>
        {children}
      </CircleBadge>
    )
  }
}
