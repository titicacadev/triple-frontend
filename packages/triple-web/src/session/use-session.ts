import { useContext } from 'react'

import { SessionStateContext } from './context'

export function useSession() {
  const context = useContext(SessionStateContext)

  if (context === undefined) {
    throw new Error('SessionContext가 없습니다.')
  }

  return context
}