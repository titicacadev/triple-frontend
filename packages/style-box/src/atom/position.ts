import { css } from 'styled-components'
import CSS from 'csstype'

import { Position } from '../types'

export const position = (
  defaultValue?: CSS.PositionProperty | Position,
) => css<{
  position?: CSS.PositionProperty | Position
  unit?: string
}>`
  ${({ position = defaultValue, unit = 'px' }) => {
    if (!position) {
      return ''
    }

    if (typeof position === 'object') {
      return `
        position: ${position.type};
        ${position.top ? `top: ${position.top}${unit};` : ''}
        ${position.right ? `right: ${position.right}${unit};` : ''}
        ${position.bottom ? `bottom: ${position.bottom}${unit};` : ''}
        ${position.left ? `left: ${position.left}${unit};` : ''}
      `
    }

    return `position: ${position}`
  }}
`
