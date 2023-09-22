import { css } from 'styled-components'

import { MarginPadding } from '../commons'
import { unit } from '../utils/unit'

export const safeAreaInsetMixin = css<{
  padding?: MarginPadding
}>`
  @supports (padding: env(safe-area-inset-bottom)) {
    ${({ padding }) => {
      const paddingBottom = unit(padding?.bottom || 0) || '0px' // HACK: 0 대신 0px로 넣어줘야 calc가 정상작동한다

      return `padding-bottom: calc(env(safe-area-inset-bottom) + ${paddingBottom});`
    }}
  }
`
