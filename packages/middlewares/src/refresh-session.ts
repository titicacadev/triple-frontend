import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { get, post } from '@titicaca/fetcher'
import { splitCookiesString, parseString } from 'set-cookie-parser'

import { X_SOTO_SESSION, TP_TK, TP_SE } from './constants'
import { CustomMiddleware } from './chain'

/**
 * TF 13.42.1의 react-contexts/src/middleware 참고하여 작성
 * https://github.com/titicacadev/triple-frontend/blob/8d002e80f9ff187d6a06b6a2695c48f1d5383662/packages/react-contexts/src/middleware.ts
 */
export function refreshSessionMiddleware(customMiddleware: CustomMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const allCookies = request.cookies.getAll()

    const isSessionExisted = allCookies.some(
      ({ name }) => name === X_SOTO_SESSION || name === TP_TK || name === TP_SE,
    )

    const cookies = deriveAllCookies(request.cookies.getAll())

    if (!isSessionExisted) {
      return customMiddleware(request, event, NextResponse.next())
    }

    const options = {
      cookie: cookies,
      withApiUriBase: true,
    }

    const firstTrialResponse = await get('/api/users/me', options)

    if (firstTrialResponse.status !== 401) {
      return customMiddleware(request, event, NextResponse.next())
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

        const response = NextResponse.next({
          request,
        })

        response.headers.set('set-cookie', setCookie)

        return customMiddleware(request, event, response)
      }
    }
    return customMiddleware(request, event, NextResponse.next())
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
