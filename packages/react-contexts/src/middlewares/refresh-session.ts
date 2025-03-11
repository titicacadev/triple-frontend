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

export function refreshSessionMiddleware(next: NextMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const response = (await next(request, event)) as NextResponse
    // const url = request.nextUrl

    // const isPageUrl = url.pathname.match('^/((?!(api|static|.*\\..*|_next)).*)')
    // if (!isPageUrl) {
    //   return response
    // }

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
        const oldCookies = splitCookiesString(
          request.headers.get('cookie') || '',
        )
        const setCookies = splitCookiesString(setCookie)

        const newCookies = oldCookies.reduce((map, cookie) => {
          const { name } = parseString(cookie)
          return map.set(name, cookie)
        }, new Map())

        setCookies.forEach((cookie) => {
          const { name } = parseString(cookie)
          newCookies.set(name, cookie)
        })

        const finalCookie = [...newCookies.values()].join('; ')

        request.headers.set('cookie', finalCookie)

        response.headers.set('set-cookie', setCookie)

        return response
      }
    }
    return response
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
