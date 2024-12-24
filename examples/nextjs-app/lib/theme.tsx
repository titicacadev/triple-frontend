'use client'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme, GlobalStyle } from '@titicaca/tds-theme'
import { PropsWithChildren } from 'react'

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <StyledThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}
