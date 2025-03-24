import { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

export const expiredTheme = {
  backgroundColor: 'rgba(41, 41, 45, 0.1)',
  titleColor: 'rgba(41, 41, 45, 1)',
  button: {
    color: 'rgba(41, 41, 45, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(41, 41, 45, 0.15)',
  },
}

export type ExpiredTheme = typeof expiredTheme

export function ExpiredThemeProvider({
  theme = expiredTheme,
  children,
}: PropsWithChildren<{ theme?: ExpiredTheme }>) {
  return (
    <ThemeProvider theme={{ expired: theme } as unknown as DefaultTheme}>
      {children}
    </ThemeProvider>
  )
}
