import { css } from 'styled-components'

interface Params {
  horizontalScroll?: boolean
}

export const horizontalScrollMixin = ({ horizontalScroll }: Params) =>
  horizontalScroll
    ? css`
        white-space: nowrap;
        overflow: auto hidden;
      `
    : undefined
