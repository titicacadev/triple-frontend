import { css } from 'styled-components'
import { MarginPadding, Styles } from '../types'

export const padding = (defaultValue?: MarginPadding) => ({
  padding,
}: Styles) => {
  const value = padding || defaultValue

  return (
    value &&
    css`
      padding-top: ${value.top}px;
      padding-right: ${value.right}px;
      padding-bottom: ${value.bottom}px;
      padding-left: ${value.left}px;
    `
  )
}
