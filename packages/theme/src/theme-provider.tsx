// src/App.tsx

import React from 'react'
import { ThemeProvider as BaseThemeProvider } from 'styled-components'
import light from './themes/light'
import dark from './themes/dark'

interface ThemeProviderProps {
  children: React.ReactChildren
  isDark?: boolean
  theme?: any
}

function ThemeProvider({ children, isDark, theme = {} }: ThemeProviderProps) {
  return (
    <BaseThemeProvider
      theme={isDark ? { ...dark, ...theme } : { ...light, theme }}
    >
      {children}
    </BaseThemeProvider>
  )
}

export default ThemeProvider
