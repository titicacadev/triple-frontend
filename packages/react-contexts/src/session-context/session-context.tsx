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

import { useEnv } from '../env-context'

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
  authBasePath: authBasePathFromProps,
  children,
}: PropsWithChildren<{
  sessionId?: string
  /**
   * @deprecated env context를 사용하세요.
   */
  authBasePath?: string
}>) {
  const { authBasePath: authBasePathFromContext } = useEnv()
  const hasSessionId = Boolean(sessionId)

  const authBasePath = useMemo(() => {
    if (authBasePathFromContext) {
      return authBasePathFromContext
    }
    if (typeof authBasePathFromProps === 'string') {
      // TODO: 개발용 logger 만들기
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'authBasePath prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.\nhttps://github.com/titicacadev/triple-frontend/blob/ab1648a7cdb684ee2752eb5b80eed02940106964/packages/react-contexts/src/env-context/README.md#%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%98%EB%8A%94-%EB%B2%95',
        )
      }

      return authBasePathFromProps
    }
    throw new Error('authBasePath를 구할 수 없습니다.')
  }, [authBasePathFromContext, authBasePathFromProps])

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
    unsetSessionID()
    window.location.href = '/'
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
