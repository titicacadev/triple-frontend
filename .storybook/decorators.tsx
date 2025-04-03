import React from 'react'
import { GlobalStyle, defaultTheme } from '../packages/tds-theme/src'
import { TripleWeb } from '../packages/triple-web/src'
import { isMobile } from '../packages/triple-web-utils/src'
import { ThemeProvider } from 'styled-components'
import { UAParser } from 'ua-parser-js'

export function themeDecorator(Story) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
}

export function tripleWebProviderDecorator(Story, context) {
  const ua = new UAParser(navigator.userAgent).getResult()
  return (
    <TripleWeb
      clientAppProvider={null}
      envProvider={{
        appUrlScheme: 'dev-soto',
        basePath: '/',
        webUrlBase: 'https://triple-dev.titicaca-corp.com',
        facebookAppId: '',
        defaultPageTitle: '',
        defaultPageDescription: '',
        googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
        webAssetsUrl: 'https://assets.triple-dev.titicaca-corp.com',
      }}
      i18nProvider={{
        defaultLocale: 'ko',
        locale: context.globals.locale,
      }}
      sessionProvider={{
        user: null,
      }}
      userAgentProvider={{
        ...ua,
        isMobile: isMobile(ua),
      }}
    >
      <Story />
    </TripleWeb>
  )
}
