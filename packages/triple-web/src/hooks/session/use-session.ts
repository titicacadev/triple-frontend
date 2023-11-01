import { useContext } from 'react'

import { SessionStateContext } from '../../contexts'

export function useSession() {
  const context = useContext(SessionStateContext)

  if (context === undefined) {
    throw new Error('')
  }

  return context
}
