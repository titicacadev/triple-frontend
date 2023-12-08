import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { SessionValue } from '../types'

export const SessionStateContext = createContext<SessionValue | undefined>(
  undefined,
)
export const SessionUpdaterContext = createContext<
  Dispatch<SetStateAction<SessionValue>> | undefined
>(undefined)

export function useSession() {
  const context = useContext(SessionStateContext)

  if (context === undefined) {
    throw new Error('SessionContext가 없습니다.')
  }

  return context
}

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
