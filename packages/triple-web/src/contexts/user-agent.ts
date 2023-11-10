import { createContext, useContext } from 'react'

import { UserAgentValue } from '../types'

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
