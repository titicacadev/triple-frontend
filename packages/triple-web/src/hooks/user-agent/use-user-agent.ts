import { useContext } from 'react'

import { UserAgentContext } from '../../contexts/user-agent'

export function useUserAgent() {
  const context = useContext(UserAgentContext)

  if (context === undefined) {
    throw new Error('UserAgentContext가 없습니다.')
  }

  return context
}
