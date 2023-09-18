import { PropsWithChildren } from 'react'
import { ItineraryItemType } from '@titicaca/content-type-definitions'
import { useTheme } from 'styled-components'

import { CircleBadge } from './badge'

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
  return function ColorBadgeComponent({
    children,
    ...rest
  }: PropsWithChildren<HocProps>) {
    const { colors } = useTheme()

    function getColorOfType(type: ItineraryItemType['poi']['type']) {
      switch (type) {
        case 'hotel':
          return colors.mint
        case 'restaurant':
          /** TODO: move to color-palette */
          return 'rgba(255, 97, 104, 1)'
        case 'attraction':
          return colors.purple
      }

      throw new Error('Unknown color of content type')
    }

    return (
      <CircleBadge {...rest} color={getColorOfType(type)}>
        {children}
      </CircleBadge>
    )
  }
}
