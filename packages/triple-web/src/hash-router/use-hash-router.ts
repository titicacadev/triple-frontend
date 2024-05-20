import { useContext } from 'react'

import { HashRouterContext } from './context'

/**
 * HashRouterContext 값을 가져옵니다.
 */
export function useHashRouter() {
  const context = useContext(HashRouterContext)

  if (!context) {
    throw new Error('HashRouterContext가 존재하지 않습니다.')
  }

  return context
}
