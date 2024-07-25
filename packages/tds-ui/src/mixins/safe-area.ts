import { css } from 'styled-components'

import { MarginPadding } from '../commons'
import { unit } from '../utils/unit'

export interface SafeAreaInsetMixinProps {
  padding?: MarginPadding
}

export const safeAreaInsetMixin = ({ padding }: SafeAreaInsetMixinProps) => {
  const paddingBottom = unit(padding?.bottom || '0px')

  return css`
    @supports (padding: env(safe-area-inset-bottom)) {
      padding-bottom: calc(env(safe-area-inset-bottom) + ${paddingBottom});
    }
  `
}
