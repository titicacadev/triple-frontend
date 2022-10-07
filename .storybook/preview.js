import { RouterContext } from 'next/dist/shared/lib/router-context' // next 12
import {
  HistoryProvider,
  SessionContextProvider,
  EnvProvider,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import { TripleClientMetadataProvider } from '@titicaca/react-triple-client-interfaces'
import { GlobalStyle } from '@titicaca/core-elements'
import MockDate from 'mockdate'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const decorators = [
  globalStyleDecorator,
  envProviderDecorator,
  sessionContextProviderDecorator,
  historyProviderDecorator,
  userAgentProviderDecorator,
  tripleClientMetadataDecorator,
  newDateMockingDecorator,
]

export function globalStyleDecorator(Story) {
  return (
    <>
      <GlobalStyle />
      <Story />
    </>
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

export function newDateMockingDecorator(Story) {
  MockDate.set('1/1/2022')
  return <Story />
}
