'use client'

import { PropsWithChildren } from 'react'

import {
  Env,
  EnvContext,
  SessionProvider,
  SessionProviderValue,
  UserAgent,
  UserAgentContext,
  HashRouterProvider,
} from './contexts'
import { ClientApp, ClientAppContext } from './contexts/client-app'
import { LoginCtaModal, TransitionModal } from './components'

export interface TripleWebProps extends PropsWithChildren {
  clientAppProvider?: ClientApp
  envProvider?: Env
  sessionProvider?: SessionProviderValue
  userAgentProvider?: UserAgent
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
            <HashRouterProvider>{children}</HashRouterProvider>
            <LoginCtaModal />
            <TransitionModal />
          </UserAgentContext.Provider>
        </SessionProvider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
