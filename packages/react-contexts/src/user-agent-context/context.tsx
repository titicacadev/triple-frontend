import React, { ComponentType, createContext, FC, useContext } from 'react'
import { DeepPartial } from 'utility-types'

import { App, OS } from './utils'

interface UserAgentContextValue {
  isPublic: boolean
  isMobile: boolean
  os: OS
  app: App
}

const UserAgentContext = createContext<UserAgentContextValue>({
  isPublic: false,
  isMobile: false,
  os: { name: '', version: '' },
  app: null,
})

export const UserAgentProvider = UserAgentContext.Provider

export function useUserAgentContext() {
  return useContext(UserAgentContext)
}

export interface WithUserAgentBaseProps {
  userAgent: UserAgentContextValue
}

export function withUserAgent<P extends DeepPartial<WithUserAgentBaseProps>>(
  Component: ComponentType<P>,
): FC<Omit<P, keyof WithUserAgentBaseProps>> {
  return function WithUserAgentContextComponent(props) {
    const userAgent = useUserAgentContext()

    return <Component {...({ ...props, userAgent } as P)} />
  }
}
