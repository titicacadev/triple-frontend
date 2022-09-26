import { css } from 'styled-components'

import { Position, RichPosition } from '../types'
import { isObject, isString } from '../utils'

export const position = (defaultValue?: Position) => css<{
  position?: Position
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
      } as RichPosition

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
