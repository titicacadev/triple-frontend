import { createContext, useContext } from 'react'

import { EnvValue } from '../types'

export const EnvContext = createContext<EnvValue | undefined>(undefined)

export function useEnv() {
  const context = useContext(EnvContext)

  if (context === undefined) {
    throw new Error('EnvContext가 없습니다.')
  }

  return context
}
