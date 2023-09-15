// import original module declarations
import 'styled-components'
import type { Theme } from './theme/types'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
