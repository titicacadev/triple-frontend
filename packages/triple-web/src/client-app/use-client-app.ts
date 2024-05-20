import { useContext } from 'react'

import { ClientAppContext } from './context'

/**
 * ClientAppContext 값을 가져옵니다.
 */
export function useClientApp() {
  const context = useContext(ClientAppContext)

  if (context === undefined) {
    throw new Error('ClientAppContext가 없습니다.')
  }

  return context
}
