import { css } from 'styled-components'
import { Property } from 'csstype'

interface Params {
  bullet?: boolean
  textAlign?: Property.TextAlign
}

export const bulletMixin = ({ bullet, textAlign }: Params) =>
  bullet
    ? css`
        ${textAlign ? '' : 'position: relative; padding-left: 0.6em;'}

        ::before {
          content: '·';
          ${textAlign
            ? 'padding-right: 0.6em;'
            : 'position: absolute; top: 0; left: 0;'}
        }
      `
    : undefined
