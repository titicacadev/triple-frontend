import { css } from 'styled-components'

interface Params {
  bullet?: boolean
}

export const bulletMixin = ({ bullet }: Params) =>
  bullet
    ? css`
        position: relative;
        padding-left: 0.5em;

        &::before {
          content: '·';
          position: absolute;
          top: 0;
          left: 0;
        }
      `
    : undefined
