import { createContext, useCallback, useContext, useState } from 'react'

export interface User {
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

export const GET_USER_REQUEST_URL = '/api/users/me'

const UserContext = createContext<User | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export const UserProvider = UserContext.Provider

export function useUserState(initialUser: User | undefined) {
  const [user, setUser] = useState(initialUser)

  const clear = useCallback(() => {
    setUser(undefined)
  }, [])

  return { user, clear }
}
