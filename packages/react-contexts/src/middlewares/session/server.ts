import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { get } from '@titicaca/fetcher'
import {
  TP_SE,
  TP_TK,
  SESSION_KEY as X_SOTO_SESSION,
} from '@titicaca/constants'

import { parseApp } from '../../user-agent-context'

import { getSessionRefreshResponse } from './refresh-session'

export function serverRefreshSessionMiddleware(next: NextMiddleware) {
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

    const firstTrialResponse = await get('/api/users/session/verify', options)

    if (firstTrialResponse.status !== 401) {
      return response
    }

    const sessionRefreshResponse = await getSessionRefreshResponse({
      next,
      request,
      event,
      options,
    })

    return sessionRefreshResponse || response
  }
}

function deriveAllCookies(cookies: { name: string; value: string }[]) {
  return cookies.map(({ name, value }) => [name, value].join('=')).join('; ')
}
