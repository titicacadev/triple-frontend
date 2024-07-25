import { css } from 'styled-components'

export interface HorizontalScrollMixinProps {
  horizontalScroll?: boolean
}

export const horizontalScrollMixin = ({
  horizontalScroll,
}: HorizontalScrollMixinProps) =>
  horizontalScroll
    ? css`
        white-space: nowrap;
        overflow: auto hidden;
      `
    : undefined
