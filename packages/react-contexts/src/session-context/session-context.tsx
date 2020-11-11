import { IncomingMessage } from 'http'

import qs from 'qs'
import Cookies from 'universal-cookie'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { SESSION_KEY } from '@titicaca/constants'

interface SessionContextValue {
  /** x-soto-session 쿠키 정보 유무 */
  hasSessionId: boolean
  sessionId?: string
  /** 로그인 핸들러 */
  login: (options?: AuthOptions) => void
  /** 로그아웃 핸들러 */
  logout: () => void
}

type AuthOptions = {
  /** 인증 완료 후 돌아올 URL 주소 */
  returnUrl?: string
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function getSessionID(
  req: IncomingMessage | undefined,
): string | undefined {
  const cookie = req?.headers.cookie
  return cookie ? new Cookies(cookie).get(SESSION_KEY) : undefined
}

export function setSessionID(sessionId: string | undefined) {
  if (sessionId) {
    new Cookies().set(SESSION_KEY, sessionId, { path: '/' })
  }
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
  authBasePath,
  children,
}: PropsWithChildren<{ sessionId?: string; authBasePath: string }>) {
  const hasSessionId = Boolean(sessionId)

  const login = useCallback(
    (options?: AuthOptions) => {
      const query = qs.stringify({
        returnUrl: safeReturnUrl(options?.returnUrl),
      })

      window.location.href = `${authBasePath}?${query}`
    },
    [authBasePath],
  )

  const logout = useCallback(() => {
    console.warn("Not implemented yet! Let's make PR 🧑🏻‍💻")
  }, [])

  const value = useMemo(
    () => ({
      hasSessionId,
      sessionId,
      login,
      logout,
    }),
    [hasSessionId, login, logout, sessionId],
  )

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
