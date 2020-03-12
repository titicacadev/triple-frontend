import { css } from 'styled-components'

import { UserSelect } from '../types'

export const userSelect = (defaultValue?: UserSelect) => css<{
  userSelect?: UserSelect
}>`
  ${({ userSelect = defaultValue }) => {
    return userSelect
      ? `
        user-select: ${userSelect};
        `
      : ''
  }}
`
