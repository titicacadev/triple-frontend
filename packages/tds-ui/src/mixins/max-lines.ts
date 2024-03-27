import { css } from 'styled-components'

interface Params {
  maxLines?: number
}

export const maxLinesMixin = ({ maxLines }: Params) =>
  maxLines
    ? css`
        /* stylelint-disable-next-line value-no-vendor-prefix */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${maxLines};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: pre-line;
      `
    : undefined
