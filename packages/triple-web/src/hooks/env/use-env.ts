import { useContext } from 'react'

import { EnvContext } from '../../contexts'

export function useEnv() {
  const context = useContext(EnvContext)

  if (!context) {
    throw new Error('EnvContext가 없습니다.')
  }

  return context
}
