import { css } from 'styled-components'

interface Params {
  ellipsis?: boolean
}

export const ellipsisMixin = ({ ellipsis }: Params) =>
  ellipsis
    ? css`
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      `
    : undefined
