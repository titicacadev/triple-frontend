import React from 'react'
import { ClientAppName, TripleWeb } from '../packages/triple-web'
import { defaultTheme, GlobalStyle } from '../packages/tds-theme/src'
import { TripleClientMetadataProvider } from '../packages/react-triple-client-interfaces/src'
import { ThemeProvider } from 'styled-components'
import i18n from './i18next'

export function themeDecorator(Story) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
}

export function tripleWebProviderDecorator(Story) {
  return (
    <TripleWeb
      clientAppProvider={{
        metadata: {
          name: ClientAppName.iOS,
          version: '6.5.0',
        },
        device: {
          autoplay: 'always',
          networkType: 'wifi',
        },
      }}
      envProvider={{
        appUrlScheme: 'dev-soto',
        webUrlBase: 'https://triple-dev.titicaca-corp.com',
        facebookAppId: '',
        defaultPageTitle: '',
        defaultPageDescription: '',
        googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
      }}
      i18nProvider={{
        i18n: i18n,
        lang: 'ko',
      }}
      sessionProvider={{
        user: {
          id: 'FA1243567',
        },
      }}
      userAgentProvider={{
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      }}
    >
      <Story />
    </TripleWeb>
  )
}

export function tripleClientMetadataDecorator(Story) {
  return (
    <TripleClientMetadataProvider>
      <Story />
    </TripleClientMetadataProvider>
  )
}
