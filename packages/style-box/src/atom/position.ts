import { css } from 'styled-components'
import CSS from 'csstype'

import { Position } from '../types'
import { isObject, isString } from '../utils'

export const position = (
  defaultValue?: CSS.PositionProperty | Position,
) => css<{
  position?: CSS.PositionProperty | Position
  unit?: string
}>`
  ${({ position, unit = 'px' }) => {
    if (!defaultValue && !position) {
      return ''
    }

    if (isString(position)) {
      return `position: ${position};`
    }

    if (isObject(defaultValue) || isObject(position)) {
      const mergedPosition = {
        ...(isObject(defaultValue) ? defaultValue : {}),
        ...(isObject(position) ? position : {}),
      } as Position

      return `
        position: ${mergedPosition.type};
        ${mergedPosition.top ? `top: ${mergedPosition.top}${unit};` : ''}
        ${mergedPosition.right ? `right: ${mergedPosition.right}${unit};` : ''}
        ${
          mergedPosition.bottom
            ? `bottom: ${mergedPosition.bottom}${unit};`
            : ''
        }
        ${mergedPosition.left ? `left: ${mergedPosition.left}${unit};` : ''}
      `
    }

    return `position: ${defaultValue || position};`
  }}
`
