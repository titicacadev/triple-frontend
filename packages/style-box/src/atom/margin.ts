import { css } from 'styled-components'
import { MarginPadding, Styles } from '../types'

export const margin = (defaultValue?: MarginPadding) => ({
  margin,
}: Styles) => {
  const value = margin || defaultValue

  return (
    value &&
    css`
      margin-top: ${value.top}px;
      margin-right: ${value.right}px;
      margin-bottom: ${value.bottom}px;
      margin-left: ${value.left}px;
    `
  )
}
