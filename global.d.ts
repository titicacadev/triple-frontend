import '@testing-library/jest-dom'
import 'jest-styled-components'
import {} from 'react'
import type { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp | undefined
  }
}
