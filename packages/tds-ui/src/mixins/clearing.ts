import { css } from 'styled-components'

export interface ClearingMixinProps {
  clearing?: boolean
}

export const clearingMixin = ({ clearing }: ClearingMixinProps) =>
  clearing
    ? css`
        &::after {
          content: '';
          display: block;
          clear: both;
        }
      `
    : undefined
