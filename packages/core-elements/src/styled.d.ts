import type { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp
  }
}
