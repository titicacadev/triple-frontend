import { PropsWithChildren } from 'react'
import { useTheme } from 'styled-components'

import { CircleBadge } from './badge'
import { ItineraryElementType } from './types'

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

export default function withTypeCircleBadge(type: ItineraryElementType) {
  return function ColorBadgeComponent({
    children,
    ...rest
  }: PropsWithChildren<HocProps>) {
    const { colors } = useTheme()

    function getColorOfType(type: ItineraryElementType) {
      switch (type) {
        case 'hotel':
          return colors.mint
        case 'restaurant':
          /** TODO: move to color-palette */
          return 'rgba(255, 97, 104, 1)'
        case 'attraction':
          return colors.purple
        case 'festa':
          return '#EB147B'
      }

      throw new Error('Unknown color of content type')
    }

    return (
      <CircleBadge {...rest} $color={getColorOfType(type)}>
        {children}
      </CircleBadge>
    )
  }
}
