import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { get, post } from '@titicaca/fetcher'
import { splitCookiesString, parseString } from 'set-cookie-parser'

import { CustomMiddleware } from './chain'
import { TP_TK, TP_SE } from './constants'

/**
 * 해당 미들웨어에서는 다음 순서로 사용자 인증 여부를 확인합니다.
 *
 * 1. 요청 헤더에 포함된 쿠키로 /user/me를 호출합니다.
 * 2. 401 응답을 받으면, refresh 요청을 보내서 토큰을 갱신합니다.
 * 3. 갱신된 토큰을 response의 _set-cookie_ header와 set-cookie와 request의 _cookie_ header에 전달합니다.
 * 4. 브라우저는 response의 _set-cookie_ 를 통해 브라우저 쿠키값을 갱신합니다.
 */
export function refreshSessionMiddleware(customMiddleware: CustomMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const url = request.nextUrl

    const isPageUrl = url.pathname.match('^/((?!(api|static|.*\\..*|_next)).*)')
    if (!isPageUrl) {
      return customMiddleware(request, event, NextResponse.next())
    }

    const allCookies = request.cookies.getAll()

    const isSessionExisted = allCookies.some(
      ({ name }) => name === TP_TK || name === TP_SE,
    )

    const cookies = deriveAllCookies(request.cookies.getAll())

    if (!isSessionExisted) {
      return customMiddleware(request, event, NextResponse.next())
    }

    const options = {
      cookie: cookies,
      withApiUriBase: true,
    }

    /**
     * /users/me는 x-soto-session의 유효성을 확인해서 응답합니다.
     */
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

    const response = NextResponse.next()
    return customMiddleware(request, event, response)
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
