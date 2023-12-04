import { createContext, useContext } from 'react'

import { type UserAgentValue as InitialUserAgentValue } from '../types'

type UserAgentValue = Partial<InitialUserAgentValue> & { isMobile: boolean }

export const UserAgentContext = createContext<UserAgentValue | undefined>(
  undefined,
)

export function useUserAgent() {
  const context = useContext(UserAgentContext)

  if (context === undefined) {
    throw new Error('UserAgentContext가 없습니다.')
  }

  return context
}
