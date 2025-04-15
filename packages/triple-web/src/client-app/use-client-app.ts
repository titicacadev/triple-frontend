import { useContext } from 'react'

import { ClientAppContext } from './context'
import { getClientApp } from './get-client-app'

/**
 * ClientAppContext 값을 가져옵니다.
 */
export function useClientApp() {
  const context = useContext(ClientAppContext)
  const clientApp =
    context === undefined
      ? typeof window !== 'undefined'
        ? getClientApp({
            userAgent: undefined,
            autoplay: undefined,
            networkType: undefined,
          })
        : undefined
      : context

  if (clientApp === undefined) {
    throw new Error('ClientAppContext가 없거나 클라이언트 환경이 아닙니다.')
  }

  return clientApp
}
