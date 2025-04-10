import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { DefaultTheme } from 'styled-components/dist/types'

export function NolThemeProvider<T>({
  children,
  theme,
}: {
  children: ReactNode
  theme: T
}) {
  return (
    <ThemeProvider theme={{ nol: theme } as unknown as DefaultTheme}>
      {children}
    </ThemeProvider>
  )
}
