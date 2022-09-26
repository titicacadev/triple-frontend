import { css } from 'styled-components'

import { Clearing } from '../types'

export const clearing = (defaultValue?: Clearing) => css<{
  clearing?: Clearing
}>`
  ${({ clearing = defaultValue }) => {
    return clearing
      ? `
        &:after {
           content: '';
           display: block;
           clear: both;
        }
        `
      : ''
  }}
`
