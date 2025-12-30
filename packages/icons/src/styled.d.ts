import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary?: string
      [key: string]: string | undefined
    }
  }
}
