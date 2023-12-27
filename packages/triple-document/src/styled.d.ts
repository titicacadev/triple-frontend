import 'styled-components'
import {} from 'styled-components/cssprop'
import type { Theme } from '@titicaca/tds-theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
