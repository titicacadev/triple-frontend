import { createContext, useCallback, useContext, useState } from 'react'

export interface User {
  name: string
  provider: AuthProvider
  country: string
  lang: string
  unregister: boolean | null
  photo: string
  mileage: Mileage
  uid: string
  email: string
  nolConnected?: boolean
  nolConnectedAt?: string
}

export type AuthProvider =
  | 'TRIPLE'
  | 'NAVER'
  | 'KAKAO'
  | 'FACEBOOK'
  | 'APPLE'
  | 'INVALID'

interface Mileage {
  badges: {
    icon: {
      image_url: string
    }
  }[]
  level: number
  point: number
}

export const GET_USER_REQUEST_URL = '/api/users/me'

const UserContext = createContext<User | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export const UserProvider = UserContext.Provider

export function useUserState(initialUser: User | undefined) {
  const [user, setUser] = useState(initialUser)

  const update = useCallback(
    (user: User | undefined) => {
      setUser(user)
    },
    [setUser],
  )

  const clear = useCallback(() => {
    setUser(undefined)
  }, [])

  return { user, clear, update }
}
