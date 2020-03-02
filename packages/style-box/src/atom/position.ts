import { css } from 'styled-components'
import CSS from 'csstype'

export const position = (defaultValue?: CSS.PositionProperty) => css<{
  position?: CSS.PositionProperty
}>`
  ${({ position = defaultValue }) => {
    return position
      ? `
       position: ${position};
      `
      : ''
  }}
`
