import {
  ClientAppValue,
  EnvValue,
  SessionValue,
  TripleWeb,
  UserAgentValue,
} from '@titicaca/triple-web'
import { PropsWithChildren } from 'react'

export interface TestWrapperProps {
  clientAppProvider?: ClientAppValue
  envProvider?: EnvValue
  sessionProvider?: SessionValue
  userAgentProvider?: UserAgentValue
}

export function createTestWrapper({
  clientAppProvider = null,
  envProvider = {
    appUrlScheme: 'dev-soto',
    webUrlBase: 'https://triple-dev.titicaca-corp.com',
    basePath: '/',
    facebookAppId: '',
    defaultPageTitle: '',
    defaultPageDescription: '',
    afOnelinkId: '',
    afOnelinkPid: '',
    afOnelinkSubdomain: '',
  },
  sessionProvider = {
    user: null,
  },
  userAgentProvider = {
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    browser: { name: 'Chrome', version: '123.0.6312.106', major: '123' },
    cpu: { architecture: 'arm64' },
    device: { type: '', model: 'Macintosh', vendor: 'Apple' },
    engine: { name: 'Blink', version: '123.0.0.0' },
    os: { name: 'macOS', version: '14.4.1' },
    isMobile: false,
  },
}: TestWrapperProps = {}) {
  return function TestWrapper({ children }: PropsWithChildren) {
    return (
      <TripleWeb
        clientAppProvider={clientAppProvider}
        envProvider={envProvider}
        i18nProvider={{ locale: 'ko' }}
        sessionProvider={sessionProvider}
        userAgentProvider={userAgentProvider}
      >
        {children}
      </TripleWeb>
    )
  }
}
