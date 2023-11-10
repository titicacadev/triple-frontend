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

export interface SessionProviderValue {
  initialSession: SessionValue
}

export interface SessionProviderProps extends PropsWithChildren {
  value: SessionProviderValue | undefined
}

export function SessionProvider({ children, value }: SessionProviderProps) {
  if (value === undefined) {
    return <>{children}</>
  }

  return <InnerSessionProvider value={value}>{children}</InnerSessionProvider>
}

interface InnerSessionProviderProps extends PropsWithChildren {
  value: SessionProviderValue
}

function InnerSessionProvider({ children, value }: InnerSessionProviderProps) {
  const [session, setSession] = useState(value.initialSession)

  return (
    <SessionStateContext.Provider value={session}>
      <SessionUpdaterContext.Provider value={setSession}>
        {children}
      </SessionUpdaterContext.Provider>
    </SessionStateContext.Provider>
  )
}
