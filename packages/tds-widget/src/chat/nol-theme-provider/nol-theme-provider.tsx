import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { DefaultTheme } from 'styled-components/dist/types'

import { convertKeysToCamelCase } from './converter'

export function NolThemeProvider<T extends { [key: string]: string }>({
  children,
  theme,
}: {
  children: ReactNode
  theme: T
}) {
  return (
    <ThemeProvider
      theme={{ nol: convertKeysToCamelCase(theme) } as unknown as DefaultTheme}
    >
      {children}
    </ThemeProvider>
  )
}
