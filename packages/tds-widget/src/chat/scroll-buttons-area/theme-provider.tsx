import { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

export const scrollButtonsTheme = {
  scrollToBottomButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(234, 234, 234, 1)',
  },
  newMessageButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(41, 41, 45, 0.1)',
    boxShadowColor: 'rgba(0, 0, 0, 0.12)',
    messageColor: 'rgba(41, 41, 45, 1)',
    nameColor: 'rgba(126, 126, 129, 1)',
    thumbnailBorderColor: 'rgba(223, 223, 224, 1)',
  },
}

export type ScrollButtonsTheme = typeof scrollButtonsTheme

export function ScrollButtonsProvider({
  theme = scrollButtonsTheme,
  children,
}: PropsWithChildren<{ theme?: ScrollButtonsTheme }>) {
  return (
    <ThemeProvider theme={{ scrollButtons: theme } as unknown as DefaultTheme}>
      {children}
    </ThemeProvider>
  )
}
