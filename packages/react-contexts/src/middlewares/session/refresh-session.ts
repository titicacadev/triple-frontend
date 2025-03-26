import { post, RequestOptions } from '@titicaca/fetcher'
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { parseString, splitCookiesString } from 'set-cookie-parser'
import { SESSION_KEY as X_SOTO_SESSION } from '@titicaca/constants'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { applySetCookie } from '../utils/apply-set-cookie'
import { getDomain } from '../utils/get-domain'

export async function getSessionRefreshResponse({
  next,
  request,
  event,
  options,
}: {
  next: NextMiddleware
  request: NextRequest
  event: NextFetchEvent
  options?: RequestOptions
}) {
  /**
   * /web-session/token은 TP-TK의 유효성을 확인해서 TP_TK, TP_SE, x-soto-session 응답합니다.
   */
  const refreshResponse = await post('/api/users/web-session/token', options)

  if (refreshResponse.ok) {
    const setCookieHeader = refreshResponse.headers.get('set-cookie')

    if (setCookieHeader) {
      const setCookie = changeSetCookieDomainOnLocalhost(
        request,
        setCookieHeader,
      )
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
}

function changeSetCookieDomainOnLocalhost(
  request: NextRequest,
  setCookie: string,
) {
  const domain = getDomain(request)
  if (domain !== 'localhost') {
    return setCookie
  }
  const setCookies = splitCookiesString(setCookie)
  const domainChangedSetCookies = setCookies.map((cookie) => {
    const { domain: cookieDomain, ...rest } = parseString(cookie)
    return { domain, ...rest }
  })

  const updatedSetCookie = domainChangedSetCookies
    .map((cookie) => {
      const { name, value, ...rest } = cookie
      return `${name}=${value}; ${Object.entries(rest)
        .map(([key, val]) => `${key}=${val.toString()}`)
        .join('; ')}`
    })
    .join(', ')
  return updatedSetCookie
}
