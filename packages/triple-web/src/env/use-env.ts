import { useContext } from 'react'

import { EnvContext } from './context'

export function useEnv() {
  const context = useContext(EnvContext)

  if (context === undefined) {
    throw new Error('EnvContext가 없습니다.')
  }

  return context
}
