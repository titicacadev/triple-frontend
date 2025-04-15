import { useContext } from 'react'

import { UserAgentContext } from './context'
import { getUserAgent } from './get-user-agent'

/**
 * UserAgentContext 값을 가져옵니다.
 */
export function useUserAgent() {
  const userAgent =
    (useContext(UserAgentContext) ?? typeof window !== 'undefined')
      ? getUserAgent(window.navigator.userAgent)
      : undefined

  if (userAgent === undefined) {
    throw new Error('UserAgentContext가 없거나 클라이언트 환경이 아닙니다.')
  }

  return userAgent
}
