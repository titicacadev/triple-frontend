import { NextRequest, NextResponse } from 'next/server'
import { get, post } from '@titicaca/fetcher'
import { splitCookiesString, parseString } from 'set-cookie-parser'

import { CustomMiddleware } from './chain'

/**
 *
 * 1. 들어온 요청의 헤더에 포함된 쿠키를 이용해서 /user/me 호출해본다.
 * 2. 만약 401이 떨어지면 refresh 요청을 보내서 토큰 갱신
 * 3. 새로운 토큰을 client-side & request header 에 전달
 */
/**
 * 
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest
} from 'next/server'

import { CustomMiddleware } from './chain'

export function withMiddleware1(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // The first middleware in the chain has to create the response
    // object and pass it down the chain.
    const response = NextResponse.next()
    response.cookies.set('vercel', 'fast')

    // Perform whatever logic the first middleware needs to do
    const url = request.url
    request.cookies.set('middleware1', 'true')

    // Call the next middleware and pass the request and response
    return middleware(request, event, response)
  }
}
 */
export function sessionCookieMiddleware(paths: string[]) {
  return function withMiddleware(_: CustomMiddleware) {
    return async function middleware(request: NextRequest) {
      // paths 에 해당하지 않으면
      if (!paths.some((path) => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next()
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
        return NextResponse.next()
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

          return response
        }
      }

      // refresh 요청이 실패한 경우
      return NextResponse.json(
        { success: false, message: 'authentication failed' },
        {
          status:
            refreshResponse.status === 400 || refreshResponse.status === 401
              ? 401
              : 500,
        },
      ) // TODO: response의 status를 어떻게 사용하고 있는지 사용부를 확인해보기.
    }
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
