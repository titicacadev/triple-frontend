import { css } from 'styled-components'
import { MarginPadding } from '../types'

export const padding = (defaultValue?: MarginPadding) => css`
  ${({ padding }: { padding?: MarginPadding }) => {
    const value =
      defaultValue || padding
        ? {
            ...(defaultValue || {}),
            ...(padding || {}),
          }
        : null

    return (
      value &&
      `
        ${value.top && `padding-top: ${value.top}px;`}
        ${value.right && `padding-right: ${value.right}px;`}
        ${value.bottom && `padding-bottom: ${value.bottom}px;`}
        ${value.left && `padding-left: ${value.left}px;`}
      `
    )
  }}
`
