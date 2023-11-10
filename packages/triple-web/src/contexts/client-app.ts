import { createContext, useContext } from 'react'

import { ClientAppValue } from '../types'

export const ClientAppContext = createContext<ClientAppValue | undefined>(
  undefined,
)

export function useClientApp() {
  const context = useContext(ClientAppContext)

  if (context === undefined) {
    throw new Error('ClientAppContext가 없습니다.')
  }

  return context
}
