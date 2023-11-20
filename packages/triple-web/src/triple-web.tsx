'use client'

import { PropsWithChildren } from 'react'

import { LoginCtaModal, TransitionModal } from './components'
import {
  ClientAppContext,
  EnvContext,
  I18nProvider,
  I18nValue,
  ModalProvider,
  SessionProvider,
  UserAgentContext,
  HashRouterProvider,
} from './contexts'
import { ClientAppValue, EnvValue, SessionValue, UserAgentValue } from './types'

export interface TripleWebProps extends PropsWithChildren {
  clientAppProvider?: ClientAppValue
  envProvider?: EnvValue
  i18nProvider?: I18nValue
  sessionProvider?: SessionValue
  userAgentProvider?: UserAgentValue
}

export function TripleWeb({
  children,
  clientAppProvider,
  envProvider,
  i18nProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <ClientAppContext.Provider value={clientAppProvider}>
      <EnvContext.Provider value={envProvider}>
        <I18nProvider {...i18nProvider}>
          <SessionProvider initialSession={sessionProvider}>
            <UserAgentContext.Provider value={userAgentProvider}>
              <HashRouterProvider>
                <ModalProvider>
                  {children}
                  <LoginCtaModal />
                  <TransitionModal />
                </ModalProvider>
              </HashRouterProvider>
            </UserAgentContext.Provider>
          </SessionProvider>
        </I18nProvider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
