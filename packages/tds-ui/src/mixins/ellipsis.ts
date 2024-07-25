import { css } from 'styled-components'

export interface EllipsisMixinProps {
  ellipsis?: boolean
}

export const ellipsisMixin = ({ ellipsis }: EllipsisMixinProps) =>
  ellipsis
    ? css`
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      `
    : undefined
