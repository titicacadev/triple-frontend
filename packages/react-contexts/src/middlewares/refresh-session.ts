import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { get, post } from '@titicaca/fetcher'
import { parseString, splitCookiesString } from 'set-cookie-parser'

import { parseApp } from '../user-agent-context'

import { CustomMiddleware } from './types'
import { TP_SE, TP_TK, X_SOTO_SESSION } from './constants'

export function refreshSessionMiddleware(customMiddleware: CustomMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) {
    const url = request.nextUrl

    const isPageUrl = url.pathname.match('^/((?!(api|static|.*\\..*|_next)).*)')
    if (!isPageUrl) {
      return customMiddleware(request, event, response)
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
      return customMiddleware(request, event, response)
    }

    const options = {
      cookie: cookies,
      withApiUriBase: true,
    }

    const firstTrialResponse = await get('/api/users/me', options)

    if (firstTrialResponse.status !== 401) {
      return customMiddleware(request, event, response)
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

        return customMiddleware(request, event, response)
      }
    }
    return customMiddleware(request, event, response)
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
