'use client'

import { PropsWithChildren } from 'react'

import { Env, EnvContext, UserAgent, UserAgentContext } from './contexts'
import { ClientApp, ClientAppContext } from './contexts/client-app'

export interface TripleWebProps extends PropsWithChildren {
  clientApp?: ClientApp
  envProvider?: Env
  userAgentProvider?: UserAgent
}

export function TripleWeb({
  children,
  clientApp,
  envProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <ClientAppContext.Provider value={clientApp}>
      <EnvContext.Provider value={envProvider}>
        <UserAgentContext.Provider value={userAgentProvider}>
          {children}
        </UserAgentContext.Provider>
      </EnvContext.Provider>
    </ClientAppContext.Provider>
  )
}
