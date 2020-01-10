import React from 'react'
import { ThemeProvider as BaseThemeProvider } from 'styled-components'
import { fontSizes } from './themes/common'
import light from './themes/light'
import dark from './themes/dark'
import { Theme } from './interfaces'

interface ThemeProviderProps {
  children: React.ReactChildren
  isDark?: boolean
  theme?: Partial<Theme>
}

function ThemeProvider({
  children,
  isDark,
  theme: customTheme = {},
}: ThemeProviderProps) {
  const theme: Theme = {
    fontSizes,
    colors: isDark ? dark : light,
    ...customTheme,
  }

  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
}

export default ThemeProvider
