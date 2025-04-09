'use client'

import deepEqual from 'deep-equal'
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

import type { SessionValue } from './types'

export const SessionStateContext = createContext<SessionValue | undefined>(
  undefined,
)
export const SessionUpdaterContext = createContext<
  Dispatch<SetStateAction<SessionValue>> | undefined
>(undefined)

export interface SessionProviderProps extends PropsWithChildren {
  initialSession: SessionValue
}

export function SessionProvider({
  children,
  initialSession,
}: SessionProviderProps) {
  const [session, setSession] = useState(initialSession)

  useEffect(() => {
    if (!deepEqual(session, initialSession)) {
      setSession(initialSession)
    }
  }, [initialSession])

  return (
    <SessionStateContext.Provider value={session}>
      <SessionUpdaterContext.Provider value={setSession}>
        {children}
      </SessionUpdaterContext.Provider>
    </SessionStateContext.Provider>
  )
}
