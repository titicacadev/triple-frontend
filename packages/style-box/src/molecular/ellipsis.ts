import { css } from 'styled-components'
import { Styles } from '../types'

export const ellipsis = (defaultValue?: boolean) => ({ ellipsis }: Styles) => {
  return (
    (ellipsis || defaultValue) &&
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `
  )
}
