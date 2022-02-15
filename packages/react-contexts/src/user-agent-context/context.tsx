import { ComponentType, createContext, FC, useContext } from 'react'
import { DeepPartial } from 'utility-types'

import { UserAgentValue } from './utils'

const UserAgentContext = createContext<UserAgentValue>({
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
  userAgent: UserAgentValue
}

export function withUserAgent<P extends DeepPartial<WithUserAgentBaseProps>>(
  Component: ComponentType<P>,
): FC<Omit<P, keyof WithUserAgentBaseProps>> {
  return function WithUserAgentContextComponent(props) {
    const userAgent = useUserAgentContext()

    return <Component {...({ ...props, userAgent } as P)} />
  }
}
