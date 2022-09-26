import { createContext, useCallback, useContext, useState } from 'react'

export interface User {
  uid: string
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
