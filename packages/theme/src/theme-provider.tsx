import React from 'react'
import { ThemeProvider as BaseThemeProvider } from 'styled-components'
import commonTheme from './themes/common'
import light from './themes/light'
import dark from './themes/dark'

interface ThemeProviderProps {
  children: React.ReactChildren
  isDark?: boolean
  theme?: any
}

function ThemeProvider({
  children,
  isDark,
  theme: customTheme = {},
}: ThemeProviderProps) {
  const theme = {
    ...commonTheme,
    colors: isDark ? dark : light,
    ...customTheme,
  }

  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
}

export default ThemeProvider
