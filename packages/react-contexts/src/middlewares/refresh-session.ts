import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { get, post } from '@titicaca/fetcher'
import { parseString, splitCookiesString } from 'set-cookie-parser'
import {
  TP_SE,
  TP_TK,
  SESSION_KEY as X_SOTO_SESSION,
} from '@titicaca/constants'

import { parseApp } from '../user-agent-context'

import { applySetCookie } from './utils/apply-set-cookie'

export function refreshSessionMiddleware(next: NextMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const response = (await next(request, event)) as NextResponse
    const url = request.nextUrl

    const isPageUrl = url.pathname.match('^/((?!(api|static|.*\\..*|_next)).*)')
    if (!isPageUrl) {
      return response
    }

    const allCookies = request.cookies.getAll()

    const userAgent = request.headers.get('User-Agent')
    const tripleApp = userAgent ? parseApp(userAgent) : null

    const cookiesWithoutXSotoSession = tripleApp
      ? allCookies
      : allCookies.filter(({ name }) => name !== X_SOTO_SESSION)

    const isSessionExisted = cookiesWithoutXSotoSession.some(
      ({ name }) => name === TP_TK || name === TP_SE,
    )
    const cookies = deriveAllCookies(cookiesWithoutXSotoSession)

    if (!isSessionExisted) {
      return response
    }

    const options = {
      cookie: cookies,
      withApiUriBase: true,
    }

    /**
     * /users/session/verify는 아래와 같은 상태값을 갖습니다.
     * 200 : TP_SE와 TP_TK가 모두 유효한 경우
     * 401 : TP_SE가 유효하지 않고 TP_TK가 유효한 경우
     * 403 : TP_TK가 모두 유효하지 않은 경우
     */
    const firstTrialResponse = await get('/api/users/session/verify', options)

    if (firstTrialResponse.status !== 401) {
      const setCookie = firstTrialResponse.headers.get('set-cookie')
      if (setCookie) {
        const setCookies = splitCookiesString(setCookie)
        setCookies.forEach((cookie) => {
          const { name, value, ...rest } = parseString(cookie)
          response.cookies.set(name, value, { ...(rest as ResponseCookie) })
        })
        applySetCookie(request, response)
      }
      return response
    }

    /**
     * /web-session/token은 TP-TK의 유효성을 확인해서 TP_TK, TP_SE, x-soto-session 응답합니다.
     */
    const refreshResponse = await post('/api/users/web-session/token', options)

    const setCookie = refreshResponse.headers.get('set-cookie')

    if (setCookie) {
      const setCookies = splitCookiesString(setCookie)
      setCookies.forEach((cookie) => {
        const { name, value, ...rest } = parseString(cookie)
        response.cookies.set(name, value, { ...(rest as ResponseCookie) })
      })
      applySetCookie(request, response)
    }
    return response
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
