'use client'

import { PropsWithChildren } from 'react'
import { isMobile } from '@titicaca/triple-web-utils'

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
              <UserAgentContext.Provider
                value={{
                  ...userAgentProvider,
                  isMobile: isMobile(userAgentProvider),
                }}
              >
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
        </GeolocationContext.Provider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
