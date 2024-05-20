import { useContext } from 'react'

import { UserAgentContext } from './context'

/**
 * UserAgentContext 값을 가져옵니다.
 */
export function useUserAgent() {
  const context = useContext(UserAgentContext)

  if (context === undefined) {
    throw new Error('UserAgentContext가 없습니다.')
  }

  return context
}
