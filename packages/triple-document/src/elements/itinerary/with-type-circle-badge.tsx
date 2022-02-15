import { PropsWithChildren } from 'react'
import { purple, mint } from '@titicaca/color-palette'
import { ItineraryItemType } from '@titicaca/content-type-definitions'

import { CircleBadge } from './badge'

function getColorOfType(type: ItineraryItemType['poi']['type']) {
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

type HocProps = Omit<Parameters<typeof CircleBadge>[0], 'color'>

export default function withTypeCircleBadge(
  type: ItineraryItemType['poi']['type'],
) {
  const color = getColorOfType(type)

  return function ColorBadgeComponent({
    children,
    ...rest
  }: PropsWithChildren<HocProps>) {
    return (
      <CircleBadge {...rest} color={color}>
        {children}
      </CircleBadge>
    )
  }
}
