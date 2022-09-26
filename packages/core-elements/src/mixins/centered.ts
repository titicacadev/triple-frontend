import { css } from 'styled-components'

interface Params {
  centered?: boolean
}

export const centeredMixin = ({ centered }: Params) =>
  centered
    ? css`
        margin-left: auto;
        margin-right: auto;
      `
    : undefined
