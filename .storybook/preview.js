import { RouterContext } from 'next/dist/shared/lib/router-context' // next 12
import {
  HistoryProvider,
  SessionContextProvider,
  EnvProvider,
  UserAgentProvider,
} from '@titicaca/react-contexts'
import { TripleClientMetadataProvider } from '@titicaca/react-triple-client-interfaces'
import { GlobalStyle } from '@titicaca/core-elements'
import { I18nDecorator } from './i18n'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const decorators = [
  globalStyleDecorator,
  portalDecorator,
  tripleClientMetadataDecorator,
  userAgentProviderDecorator,
  historyProviderDecorator,
  sessionContextProviderDecorator,
  envProviderDecorator,
  I18nDecorator,
]

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'i18n locale',
    defaultValue: 'ko',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ko', right: '🇰🇷', title: '한국어' },
        { value: 'ja', right: '🇯🇵', title: '일본어' },
        { value: 'zh', right: '🇨🇳', title: '중국어(번체)' },
      ],
    },
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

export function portalDecorator(Story) {
  return (
    <>
      <Story />
      <div id="triple-portal"></div>
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
