'use client'

import { PropsWithChildren } from 'react'

import {
  LoginCtaModal,
  TransitionModal,
  LoginCtaModal,
  TransitionModal,
} from './components'
import {
  ClientAppContext,
  EnvContext,
  ModalProvider,
  SessionProvider,
  SessionProviderValue,
  UserAgentContext,
  HashRouterProvider,
} from './contexts'
import { ClientAppValue, EnvValue, UserAgentValue } from './types'

export interface TripleWebProps extends PropsWithChildren {
  clientAppProvider?: ClientAppValue
  envProvider?: EnvValue
  sessionProvider?: SessionProviderValue
  userAgentProvider?: UserAgentValue
}

export function TripleWeb({
  children,
  clientAppProvider,
  envProvider,
  sessionProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <ClientAppContext.Provider value={clientAppProvider}>
      <EnvContext.Provider value={envProvider}>
        <SessionProvider value={sessionProvider}>
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
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
