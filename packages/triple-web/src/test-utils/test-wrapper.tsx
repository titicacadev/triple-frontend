import { PropsWithChildren } from 'react'

import {
  ClientAppContext,
  EnvContext,
  HashRouterProvider,
  I18nProvider,
  ModalProvider,
  SessionProvider,
  UserAgentContext,
} from '../contexts'
import {
  ClientAppValue,
  EnvValue,
  SessionValue,
  UserAgentValue,
} from '../types'

import i18n from './i18n'

interface TestWrapperProps {
  clientAppProvider?: ClientAppValue
  envProvider?: EnvValue
  sessionProvider?: SessionValue
  userAgentProvider?: UserAgentValue
}

export function TestWrapper({
  clientAppProvider,
  envProvider,
  sessionProvider,
  userAgentProvider,
}: TestWrapperProps) {
  // eslint-disable-next-line react/display-name
  return ({ children }: PropsWithChildren) => (
    <ClientAppContext.Provider value={clientAppProvider}>
      <EnvContext.Provider value={envProvider}>
        <I18nProvider i18n={i18n} lang={undefined}>
          <SessionProvider initialSession={sessionProvider ?? { user: null }}>
            <UserAgentContext.Provider value={userAgentProvider}>
              <HashRouterProvider>
                <ModalProvider>{children}</ModalProvider>
              </HashRouterProvider>
            </UserAgentContext.Provider>
          </SessionProvider>
        </I18nProvider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
