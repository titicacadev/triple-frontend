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
  useRef,
} from 'react'
import { SESSION_KEY } from '@titicaca/constants'
import { put } from '@titicaca/fetcher'

import { User } from './service'

interface SessionContextValue {
  /**
   * 쿠키에 인증 토큰이 존재하는지 여부
   */
  hasWebSession: boolean
  /**
   * @deprecated httpOnly 쿠키를 사용하면 존재 여부를 알 수 없습니다.
   * `hasWebSession`을 사용하세요.
   */
  hasSessionId: boolean
  /**
   * @deprecated httpOnly 쿠키를 사용하면 존재 여부를 알 수 없습니다.
   * `hasWebSession`을 사용하세요.
   */
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

/**
 * 페이지 요청에 인증이 존재하는지 확인하는 함수입니다.
 * @param req 페이지 요청 데이터
 * @returns true면 인증이 존재, false면 존재하지 않음.
 */
export function checkWebSessionAvailability(req: IncomingMessage): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return !!new Cookies(req.headers.cookie).get('TP_SE')
  }
  return !!req.headers['x-triple-web-login']
}

export function SessionContextProvider({
  hasWebSession: hasWebSessionFromProps,
  sessionId,
  initialUser = null,
  children,
}: PropsWithChildren<{
  hasWebSession: boolean | undefined
  /**
   * @deprecated httpOnly 쿠키를 사용하면 넣어줄 수 없습니다.
   * `hasWebSession`만 공급해주세요.
   */
  sessionId?: string
  initialUser?: User | null
  /**
   * @deprecated env context를 사용하세요.
   */
  authBasePath?: string
}>) {
  const [user, setUser] = useState(initialUser)
  const hasWebSession = useRef(!!hasWebSessionFromProps).current

  const hasSessionId = Boolean(sessionId)

  const login = useCallback((options?: AuthOptions) => {
    const query = qs.stringify({
      returnUrl: safeReturnUrl(options?.returnUrl),
    })

    window.location.href = `/login?${query}`
  }, [])

  const logout = useCallback(async () => {
    unsetSessionID()
    setUser(null)
    await put('/api/users/logout')

    window.location.href = '/'
  }, [])

  const value = useMemo(
    () => ({
      hasSessionId,
      hasWebSession,
      sessionId,
      login,
      logout,
      user,
    }),
    [hasSessionId, hasWebSession, login, logout, sessionId, user],
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
