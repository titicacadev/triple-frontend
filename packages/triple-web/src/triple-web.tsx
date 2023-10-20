'use client'

import { PropsWithChildren } from 'react'

import {
  DeviceConfig,
  DeviceConfigContext,
  Env,
  EnvContext,
  UserAgent,
  UserAgentContext,
} from './contexts'

export interface TripleWebProps extends PropsWithChildren {
  envProvider: Env
  deviceConfigProvider?: DeviceConfig
  userAgentProvider?: UserAgent
}

export function TripleWeb({
  children,
  envProvider,
  deviceConfigProvider,
  userAgentProvider,
}: TripleWebProps) {
  return (
    <EnvContext.Provider value={envProvider}>
      <DeviceConfigContext.Provider value={deviceConfigProvider}>
        <UserAgentContext.Provider value={userAgentProvider}>
          {children}
        </UserAgentContext.Provider>
      </DeviceConfigContext.Provider>
    </EnvContext.Provider>
  )
}
