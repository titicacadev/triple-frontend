import { PropsWithChildren, createContext } from 'react'

import { type UserAgentValue as InitialUserAgentValue } from '../types'
import { validateMobile } from '../utils/user-agent'

interface UserAgentProviderProps extends PropsWithChildren {
  initialUserAgent: InitialUserAgentValue | undefined
}

type UserAgentValue = InitialUserAgentValue & { isMobile: boolean }

export const UserAgentContext = createContext<UserAgentValue | undefined>(
  undefined,
)

export function UserAgentProvider({
  initialUserAgent,
  children,
}: UserAgentProviderProps) {
  if (initialUserAgent === undefined) {
    return <>{children}</>
  }

  const isMobile = validateMobile(initialUserAgent.ua)
  const values = {
    ...initialUserAgent,
    isMobile,
  }

  return (
    <UserAgentContext.Provider value={values}>
      {children}
    </UserAgentContext.Provider>
  )
}
