import { IncomingMessage } from 'http'

import qs from 'qs'
import Cookies from 'universal-cookie'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
} from 'react'
import { SESSION_KEY } from '@titicaca/constants'

interface SessionContextValue {
  /** @deprecated x-soto-session 쿠키 정보 */
  hasSessionId: boolean
  /** session 이 없는 경우 */
  needToLogin: boolean
  /** 로그인 핸들러 */
  login: (options?: AuthOptions) => void
  /** 로그아웃 핸들러 */
  logout: () => void
}

type AuthOptions = {
  /** 인증 완료 후 돌아올 URL 주소 */
  returnUrl?: string
}

const SessionContext = createContext<SessionContextValue>({
  hasSessionId: false,
  needToLogin: true,
  login: () => {},
  logout: () => {},
})

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
  hasSessionId: hasSessionIdFromProps,
  children,
}: PropsWithChildren<{ hasSessionId: boolean }>) {
  const [hasSessionId] = useState(hasSessionIdFromProps)

  const needToLogin = !hasSessionId

  const login = useCallback((options?: AuthOptions) => {
    if (!process.env.NEXT_PUBLIC_AUTH_WEB_BASE_PATH) {
      throw new Error(
        'Insufficient environment variables in `.env.*` files\n- NEXT_PUBLIC_AUTH_WEB_BASE_PATH',
      )
    }

    const query = qs.stringify({
      returnUrl: safeReturnUrl(options?.returnUrl),
    })

    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_WEB_BASE_PATH}?${query}`
  }, [])

  const logout = useCallback(() => {
    console.warn("Not implemented yet! Let's make PR 🧑🏻‍💻")
  }, [])

  return (
    <SessionContext.Provider
      value={{ hasSessionId, needToLogin, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  return useContext(SessionContext)
}
