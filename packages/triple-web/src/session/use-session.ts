import { useContext } from 'react'

import { SessionStateContext } from './context'

/**
 * SessionContext 값을 가져옵니다.
 */
export function useSession() {
  const context = useContext(SessionStateContext)

  if (context === undefined) {
    throw new Error('SessionContext가 없습니다.')
  }

  return context
}
