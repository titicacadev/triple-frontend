import { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

const reservationInfoTheme = {
  border: 'rgba(234, 234, 234, 1)',
  background: 'rgba(255, 255, 255, 1)',
  shadow: 'rgba(0, 0, 0, 0.07)',
  detail: {
    label: 'rgba(41, 41, 45, 0.5)',
    value: 'rgba(41, 41, 45, 0.6)',
  },
  title: 'rgba(41, 41, 45, 1)',
  label: {
    blue: {
      background: 'rgba(65, 84, 255, 0.1)',
      color: 'rgba(65, 84, 255, 1)',
    },
    red: {
      background: 'rgba(255, 50, 46, 0.1)',
      color: 'rgba(255, 50, 46, 1)',
    },
    gray: {
      background: 'rgba(244, 244, 245, 1)',
      color: 'rgba(41, 41, 45, 0.6)',
    },
  },
}

export type ReservationInfoTheme = typeof reservationInfoTheme

export function ReservationInfoThemeProvider({
  theme = reservationInfoTheme,
  children,
}: PropsWithChildren<{ theme?: ReservationInfoTheme }>) {
  return (
    <ThemeProvider
      theme={{ reservationInfo: theme } as unknown as DefaultTheme}
    >
      {children}
    </ThemeProvider>
  )
}
