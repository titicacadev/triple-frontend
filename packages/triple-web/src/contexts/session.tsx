import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react'

export interface SessionUser {
  name: string
  provider: Provider
  country: string
  lang: string
  unregister: boolean | null
  photo: string
  mileage: Mileage
  uid: string
}

type Provider = 'TRIPLE' | 'NAVER' | 'KAKAO' | 'FACEBOOK' | 'APPLE'

interface Mileage {
  badges: {
    icon: {
      imageUrl: string
    }
  }[]
  level: number
  point: number
}

export interface Session {
  user: SessionUser | null
}

export const SessionStateContext = createContext<Session | undefined>(undefined)
export const SessionUpdaterContext = createContext<
  Dispatch<SetStateAction<Session>> | undefined
>(undefined)

export interface SessionProviderValue {
  initialSession: Session
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
