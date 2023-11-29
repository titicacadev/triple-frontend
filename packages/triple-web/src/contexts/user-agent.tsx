import { PropsWithChildren, createContext } from 'react'

import { type UserAgentValue as InitialUserAgentValue } from '../types'

interface UserAgentProviderProps extends PropsWithChildren {
  initialUserAgent: InitialUserAgentValue | undefined
}

type UserAgentValue = InitialUserAgentValue

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

  const values = {
    ...initialUserAgent,
  }

  return (
    <UserAgentContext.Provider value={values}>
      {children}
    </UserAgentContext.Provider>
  )
}
