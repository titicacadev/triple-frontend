import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react'

import { SessionValue } from '../types'

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

  return (
    <SessionStateContext.Provider value={session}>
      <SessionUpdaterContext.Provider value={setSession}>
        {children}
      </SessionUpdaterContext.Provider>
    </SessionStateContext.Provider>
  )
}
