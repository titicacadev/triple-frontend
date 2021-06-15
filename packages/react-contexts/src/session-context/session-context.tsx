import { IncomingMessage } from 'http'

import qs from 'qs'
import Cookies from 'universal-cookie'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { SESSION_KEY } from '@titicaca/constants'

import { fetchUser, User } from './service'

interface SessionContextValue {
  /** x-soto-session 쿠키 정보 유무 */
  hasSessionId: boolean
  sessionId?: string
  /** 로그인 핸들러 */
  login: (options?: AuthOptions) => void
  /** 로그아웃 핸들러 */
  logout: () => void
  user: User | null
}

type AuthOptions = {
  /** 인증 완료 후 돌아올 URL 주소 */
  returnUrl?: string
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function getSessionID(
  req: IncomingMessage | undefined,
): string | undefined {
  const cookieHeader = req?.headers.cookie
  return new Cookies(cookieHeader).get(SESSION_KEY)
}

export function setSessionID(sessionId: string | undefined) {
  if (sessionId) {
    new Cookies().set(SESSION_KEY, sessionId, { path: '/' })
  }
}

export function unsetSessionID() {
  new Cookies().remove(SESSION_KEY, { path: '/' })
}

/**
 * returnUrl 을 지정하지 않는 경우 자동으로 현재 url 을 returnUrl 로 설정하기 위한 유틸 함수입니다.
 * @param returnUrl
 */
function safeReturnUrl(returnUrl?: string) {
  return encodeURIComponent(
    returnUrl || location.href.replace(location.origin, ''),
  )
}

export function SessionContextProvider({
  sessionId,
  initialUser = null,
  children,
}: PropsWithChildren<{
  sessionId?: string
  initialUser?: User | null
  /**
   * @deprecated env context를 사용하세요.
   */
  authBasePath?: string
}>) {
  const [user, setUser] = useState(initialUser)

  const hasSessionId = Boolean(sessionId)

  const login = useCallback((options?: AuthOptions) => {
    const query = qs.stringify({
      returnUrl: safeReturnUrl(options?.returnUrl),
    })

    window.location.href = `/login?${query}`
  }, [])

  const logout = useCallback(() => {
    unsetSessionID()
    window.location.href = '/'
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      hasSessionId,
      sessionId,
      login,
      logout,
      user,
    }),
    [hasSessionId, login, logout, sessionId, user],
  )

  useEffect(() => {
    async function fetchAndSetUser() {
      const user = await fetchUser()

      setUser(user)
    }

    if (!initialUser) {
      fetchAndSetUser()
    }
  }, [initialUser])

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('SessionContextProvider를 찾을 수 없습니다.')
  }

  return context
}

export function useSessionContextSafely() {
  const context = useContext(SessionContext)

  return context
}
