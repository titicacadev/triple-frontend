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

import { getIsTripleApp } from './utils/get-triple-app'

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

    const isTripleApp = getIsTripleApp(request)

    const cookiesWithoutXSotoSession = isTripleApp
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

    const firstTrialResponse = await get('/api/users/me', options)

    if (firstTrialResponse.status !== 401) {
      return response
    }

    /**
     * /web-session/token은 TP-TK의 유효성을 확인해서 TP_TK, TP_SE, x-soto-session 응답합니다.
     */
    const refreshResponse = await post('/api/users/web-session/token', options)

    if (refreshResponse.ok) {
      const setCookie = refreshResponse.headers.get('set-cookie')

      if (setCookie) {
        const response = (await next(request, event)) as NextResponse
        const setCookies = splitCookiesString(setCookie)
        setCookies.forEach((cookie) => {
          const { name, value, ...rest } = parseString(cookie)
          if (name !== X_SOTO_SESSION) {
            response.cookies.set(name, value, { ...(rest as ResponseCookie) })
          }
        })
        applySetCookie(request, response)

        return response
      }
    }

    return response
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
