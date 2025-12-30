import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../packages/core-elements/src'
import {
  EnvProvider,
  HistoryProvider,
  SessionContextProvider,
  UserAgentProvider,
} from '../packages/react-contexts/src'
import { TripleClientMetadataProvider } from '../packages/react-triple-client-interfaces/src'

const theme = {
  colors: {
    primary: 'rgb(58, 58, 58)',
  },
}

export function globalStyleDecorator(Story) {
  return (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
}

export function themeProviderDecorator(Story) {
  return (
    <ThemeProvider theme={theme}>
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
      webAssetsUrl="https://assets.triple-dev.titicaca-corp.com"
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
