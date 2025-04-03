import { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

export const reservationInfoTheme = {
  borderColor: 'rgba(234, 234, 234, 1)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  shadowColor: 'rgba(0, 0, 0, 0.07)',
  detail: {
    labelColor: 'rgba(41, 41, 45, 0.5)',
    valueColor: 'rgba(41, 41, 45, 0.6)',
  },
  titleColor: 'rgba(41, 41, 45, 1)',
  label: {
    blue: {
      backgroundColor: 'rgba(65, 84, 255, 0.1)',
      color: 'rgba(65, 84, 255, 1)',
    },
    red: {
      backgroundColor: 'rgba(255, 50, 46, 0.1)',
      color: 'rgba(255, 50, 46, 1)',
    },
    gray: {
      backgroundColor: 'rgba(244, 244, 245, 1)',
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
