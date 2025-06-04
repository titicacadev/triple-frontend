/* eslint-disable no-console */
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import {
  get,
  post,
  handle401Error,
  NEED_REFRESH_IDENTIFIER,
  captureHttpError,
} from '@titicaca/fetcher'
import { parseString } from 'set-cookie-parser'
import { TP_SE, TP_TK } from '@titicaca/constants'
import { serialize, SerializeOptions } from 'cookie'

import { getDomain } from '../utils/get-domain'

/**
 *
 * next v14 이상에서 사용하는 refreshSessionMiddleware
 */
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

    const isSessionExisted = allCookies.some(
      ({ name }) => name === TP_TK || name === TP_SE,
    )
    const cookies = deriveAllCookies(allCookies)

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
    const firstTrialResponse = await get<
      unknown,
      { status: number; exception: string; message: string }
    >('/api/users/session/verify', options)

    const checkFirstTrialResponse = await handle401Error(firstTrialResponse)

    if (checkFirstTrialResponse !== NEED_REFRESH_IDENTIFIER) {
      captureHttpError(firstTrialResponse)
      const setCookieHeader = firstTrialResponse.headers.getSetCookie()
      if (setCookieHeader) {
        const setCookie = changeSetCookieDomainOnLocalhost(
          request,
          setCookieHeader,
        )
        setCookie.forEach((cookie) => {
          const { name, value, ...rest } = parseString(cookie)
          response.cookies.set(name, value, { ...(rest as ResponseCookie) })
        })
      }
      return response
    }

    /**
     * /web-session/token은 TP-TK의 유효성을 확인해서 TP_TK, TP_SE, x-soto-session 응답합니다.
     */
    console.log('/web-session/token 실행')
    const refreshResponse = await post('/api/users/web-session/token', options)
    captureHttpError(refreshResponse)

    const setCookieHeader = refreshResponse.headers.getSetCookie()

    console.log(setCookieHeader)
    if (setCookieHeader) {
      const setCookie = changeSetCookieDomainOnLocalhost(
        request,
        setCookieHeader,
      )
      console.log('setCookie', setCookie)
      setCookie.forEach((cookie) => {
        const { name, value, ...rest } = parseString(cookie)
        response.cookies.set(name, value, { ...(rest as ResponseCookie) })
      })
      console.log(response)
    }
    return response
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}

function changeSetCookieDomainOnLocalhost(
  request: NextRequest,
  setCookie: string[],
) {
  const domain = getDomain(request)
  if (domain !== 'localhost') {
    return setCookie
  }

  const domainChangedSetCookies = setCookie.map((cookie) => {
    const { domain: originalDomain, ...rest } = parseString(cookie)
    return { domain, ...rest }
  })

  return domainChangedSetCookies.map((cookie) => {
    return serialize(cookie.name, cookie.value, cookie as SerializeOptions)
  })
}
