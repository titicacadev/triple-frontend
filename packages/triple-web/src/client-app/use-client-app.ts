import { useContext } from 'react'

import { ClientAppContext } from './context'

export function useClientApp() {
  const context = useContext(ClientAppContext)

  if (context === undefined) {
    throw new Error('ClientAppContext가 없습니다.')
  }

  return context
}
