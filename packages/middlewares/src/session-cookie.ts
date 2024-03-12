import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { get, post } from '@titicaca/fetcher'
import { splitCookiesString, parseString } from 'set-cookie-parser'

import { CustomMiddleware } from './chain'

/**
 * 1. 들어온 요청의 헤더에 포함된 쿠키를 이용해서 /user/me 호출해본다.
 * 2. 만약 401이 떨어지면 refresh 요청을 보내서 토큰 갱신
 * 3. 새로운 토큰을 client-side & request header 에 전달
 */
export function sessionCookieMiddleware(paths: string[]) {
  return function withMiddleware(customMiddleware: CustomMiddleware) {
    return async function middleware(
      request: NextRequest,
      event: NextFetchEvent,
    ) {
      const isPathMismatched = !paths.some((path) =>
        request.nextUrl.pathname.startsWith(path),
      )
      if (isPathMismatched) {
        return customMiddleware(request, event, NextResponse.next())
      }

      const cookies = deriveAllCookies(request.cookies.getAll())
      const options = {
        cookie: cookies,
        withApiUriBase: true,
      }

      /**
       * /users/me는 x-soto-session의 유효성을 확인해서 응답한다.
       */
      const firstTrialResponse = await get('/api/users/me', options)
      if (firstTrialResponse.status !== 401) {
        return customMiddleware(request, event, NextResponse.next())
      }

      /**
       * /web-session/token은 TP-TK의 유효성을 확인해서 TP_TK, TP_SE, x-soto-session 응답한다.
       */
      const refreshResponse = await post(
        '/api/users/web-session/token',
        options,
      )

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

      // refresh 요청이 실패한 경우
      return customMiddleware(
        request,
        event,
        NextResponse.json(
          { success: false, message: 'authentication failed' },
          {
            status:
              refreshResponse.status === 400 || refreshResponse.status === 401 // == NEED_LOGIN
                ? 401
                : 500,
          },
        ),
      )
    }
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
