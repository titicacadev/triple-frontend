import { CSSProp } from 'styled-components'

import type { Theme } from './theme/types'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>
  }
}
