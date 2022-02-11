import styled, { css } from 'styled-components'
import { purple, white } from '@titicaca/color-palette'

import withTypeCircleBadge from './with-type-circle-badge'

const BadgeBase = styled.span`
  display: inline-block;
  font-weight: bold;
  text-align: center;
`

/**
 * TODO: TF/core-elements 에 label 로 있어 이동하면서 병합 및 리펙토링을 진행합니다.
 * - [x] color
 * - [ ] size(fontSize 도 size 값에 상대적으로 동작되도록)
 * - [ ] border-radius
 * - [ ] GetGlobalColor 사용해서 컬러 설정되도록 (현재는 별도 컬러는 사용하고 있음)
 *
 * usage
 *
 * <Badge>쿠폰 한일가 적용</Badge>
 * <Badge color="black">쿠폰 할인가 적용</Badge>
 * <Badge inverted>쿠폰 할인가 적용</Badge>
 * <Badge radius={100}>1</Badge>
 */
export const Badge = styled(BadgeBase)<{
  color?: string
  fontSize?: number
  radius?: number
  inverted?: boolean
}>`
  font-size: ${({ fontSize = 10 }) => fontSize}px;
  border-radius: ${({ radius = 2 }) => radius}px;
  padding: 3px 4px;

  ${({ color, inverted }) =>
    inverted
      ? css`
          color: ${color};
          border: 1px solid ${color};
        `
      : css`
          color: ${white};
          border: 1px solid ${color};
          background-color: ${color};
        `}
`

export const CircleBadge = styled(BadgeBase)<{
  color?: string
  borderless?: boolean
}>`
  font-size: 11px;
  color: white;
  width: 24px;
  height: 24px;
  padding-top: 4px;
  border-radius: 100%;
  background-color: ${({ color = purple }) => color};

  ${({ borderless }) =>
    borderless
      ? undefined
      : css`
          border: 2px solid ${white};
        `}
`

export const HotelCircleBadge = withTypeCircleBadge('hotel')
export const AttractionCircleBadge = withTypeCircleBadge('attraction')
export const RestaurantCircleBadge = withTypeCircleBadge('restaurant')
