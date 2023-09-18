import React from 'react'
import {
  EnvProvider,
  HistoryProvider,
  SessionContextProvider,
  UserAgentProvider,
} from '../packages/react-contexts/src'
import { defaultTheme, GlobalStyle } from '../packages/tds-theme/src'
import { TripleClientMetadataProvider } from '../packages/react-triple-client-interfaces/src'
import { ThemeProvider } from 'styled-components'

export function themeDecorator(Story) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
}

export function envProviderDecorator(Story) {
  return (
    <EnvProvider
      appUrlScheme="dev-soto"
      webUrlBase="https://triple-dev.titicaca-corp.com"
      authBasePath="MOCK_AUTH_BASE_PATH"
      facebookAppId=""
      defaultPageTitle=""
      defaultPageDescription=""
      googleMapsApiKey="AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4"
      afOnelinkId=""
      afOnelinkPid=""
      afOnelinkSubdomain=""
    >
      <Story />
    </EnvProvider>
  )
}

export function historyProviderDecorator(Story) {
  return (
    <HistoryProvider
      isPublic={false}
      isAndroid={false}
      transitionModalHash="transition.general"
    >
      <Story />
    </HistoryProvider>
  )
}

export function sessionContextProviderDecorator(Story) {
  return (
    <SessionContextProvider
      type="browser"
      props={{
        initialUser: undefined,
        initialSessionAvailability: false,
      }}
    >
      <Story />
    </SessionContextProvider>
  )
}

export function userAgentProviderDecorator(Story) {
  return (
    <UserAgentProvider
      value={{
        isPublic: true,
        isMobile: false,
        os: {},
        app: null,
      }}
    >
      <Story />
    </UserAgentProvider>
  )
}

export function tripleClientMetadataDecorator(Story) {
  return (
    <TripleClientMetadataProvider>
      <Story />
    </TripleClientMetadataProvider>
  )
}
