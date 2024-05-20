import { useContext } from 'react'

import { EnvContext } from './context'

/**
 * EnvContext 값을 가져옵니다.
 */
export function useEnv() {
  const context = useContext(EnvContext)

  if (context === undefined) {
    throw new Error('EnvContext가 없습니다.')
  }

  return context
}
