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
  UserAgentProvider,
  HashRouterProvider,
  GeolocationContext,
} from './contexts'
import {
  ClientAppValue,
  EnvValue,
  GeolocationValue,
  SessionValue,
  UserAgentValue,
} from './types'

export interface TripleWebProps extends PropsWithChildren {
  clientAppProvider?: ClientAppValue
  envProvider?: EnvValue
  geolocationProvider?: GeolocationValue
  i18nProvider?: I18nValue
  sessionProvider?: SessionValue
  userAgentProvider?: UserAgentValue
}

export function TripleWeb({
  children,
  clientAppProvider,
  envProvider,
  geolocationProvider,
  i18nProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <ClientAppContext.Provider value={clientAppProvider}>
      <EnvContext.Provider value={envProvider}>
        <GeolocationContext.Provider value={geolocationProvider}>
          <I18nProvider {...i18nProvider}>
            <SessionProvider initialSession={sessionProvider}>
              <UserAgentProvider initialUserAgent={userAgentProvider}>
                <HashRouterProvider>
                  <ModalProvider>
                    {children}
                    <LoginCtaModal />
                    <TransitionModal />
                  </ModalProvider>
                </HashRouterProvider>
              </UserAgentProvider>
            </SessionProvider>
          </I18nProvider>
        </GeolocationContext.Provider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
