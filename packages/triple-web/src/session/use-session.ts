import { useContext, useEffect, useState } from 'react'

import { SessionStateContext } from './context'
import { fetchUser } from './get-session'

/**
 * SessionContext 값을 가져옵니다.
 */
export function useSession() {
  const context = useContext(SessionStateContext)
  const [session, setSession] = useState(context)

  useEffect(() => {
    setSession(context)
  }, [context])

  useEffect(() => {
    async function fetchUserOnUndefinedContext() {
      if (session === undefined && typeof window !== 'undefined') {
        const user = await fetchUser({ cookie: document.cookie })
        if (user !== null) {
          setSession({ user })
        }
      }
    }
    fetchUserOnUndefinedContext()
  }, [session])

  if (context === undefined) {
    throw new Error('SessionContext가 없습니다.')
  }

  return context
}
