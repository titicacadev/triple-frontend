import { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

export const scrollButtonsTheme = {
  scrollToBottomButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)', // color-neutral-w-100
    borderColor: 'rgba(234, 234, 234, 1)', // color-neutral-g-10
  },
  newMessageButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)', // color-neutral-w-100
    borderColor: 'rgba(41, 41, 45, 0.1)', // color-neutral-b-10
    boxShadowColor: 'rgba(0, 0, 0, 0.12)',
    messageColor: 'rgba(41, 41, 45, 1)', // color-neutral-b-100
    nameColor: 'rgba(126, 126, 129, 1)', // color-neutral-g-60
    thumbnailBorderColor: 'rgba(223, 223, 224, 1)', // color-neutral-g-15
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
