import { useContext } from 'react'

import { ClientAppContext } from '../../contexts'

export function useClientApp() {
  const context = useContext(ClientAppContext)

  if (context === undefined) {
    throw new Error('ClientAppContext가 없습니다.')
  }

  return context
}
