import { css } from 'styled-components'

interface Params {
  clearing?: boolean
}

export const clearingMixin = ({ clearing }: Params) =>
  clearing
    ? css`
        &::after {
          content: '';
          display: block;
          clear: both;
        }
      `
    : undefined
