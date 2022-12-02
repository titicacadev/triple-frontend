/* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
import { css } from 'styled-components'

interface Params {
  maxLines?: number
}

export const maxLinesMixin = ({ maxLines }: Params) =>
  maxLines
    ? css`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${maxLines};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: pre-line;
        visibility: visible;
      `
    : undefined
