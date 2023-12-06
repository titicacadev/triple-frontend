import { IncomingMessage } from 'http'

import { NextPageContext } from 'next'
import { SessionUser, SessionValue } from '@titicaca/triple-web'
import {
  ssrFetcherize,
  captureHttpError,
  authFetcherize,
  post,
  get,
} from '@titicaca/fetcher'
import Cookies from 'universal-cookie'
import {
  GET_USER_REQUEST_URL,
  checkClientApp,
} from '@titicaca/triple-web-utils'

/**
 * - app (server-side): refresh X
 * - app (client-side): refresh X
 * - browser (server-side) refresh O
 * - browser (client-side) refresh O
 * @returns
 */
export async function getSession(ctx: NextPageContext): Promise<SessionValue> {
  const user = await fetchUser(ctx.req)

  return {
    user,
  }
}

export function getSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
): boolean {
  const userAgent = getUserAgent(req)
  const isClientApp = checkClientApp(userAgent)
  const cookies = new Cookies(req?.headers.cookie)

  let hasSession = false

  if (isClientApp) {
    hasSession = !!cookies.get('x-soto-session')
  } else {
    hasSession = !!req?.headers['x-triple-web-login']
    if (process.env.NODE_ENV !== 'production') {
      hasSession = !!cookies.get('TP_SE')
    }
  }

  return hasSession
}

async function fetchUser(req: IncomingMessage | undefined) {
  const userAgent = getUserAgent(req)
  const isClientApp = checkClientApp(userAgent)

  if (req) {
    // Server-side

    // 세션이 없으면 fetch를 스킵합니다.
    const hasSession = getSessionAvailabilityFromRequest(req)

    if (!hasSession) {
      return null
    }

    // fetch 시작
    const ssrFetcherizeOptions = {
      apiUriBase: process.env.API_URI_BASE || '',
      cookie: req.headers.cookie,
    }

    if (isClientApp) {
      const finalFetcher = ssrFetcherize(get, ssrFetcherizeOptions)

      const response = await finalFetcher<SessionUser>(GET_USER_REQUEST_URL)

      if (response.status !== 401) {
        captureHttpError(response)
      }

      if (response.ok === false) {
        return null
      }

      return response.parsedBody
    } else {
      const finalFetcher = authFetcherize(
        ssrFetcherize(get, ssrFetcherizeOptions),
        {
          refresh: () =>
            ssrFetcherize(
              post,
              ssrFetcherizeOptions,
            )('/api/users/web-session/token'),
        },
      )

      const response = await finalFetcher<SessionUser>(GET_USER_REQUEST_URL)

      if (response === 'NEED_LOGIN') {
        return null
      }

      captureHttpError(response)

      if (response.ok === false) {
        return null
      }

      return response.parsedBody
    }
  } else {
    // Client-side
    if (isClientApp) {
      const finalFetcher = get

      const response = await finalFetcher<SessionUser>(GET_USER_REQUEST_URL)

      if (response.status !== 401) {
        captureHttpError(response)
      }

      if (response.ok === false) {
        return null
      }

      return response.parsedBody
    } else {
      const finalFetcher = authFetcherize(get, {
        refresh: () => post('/api/users/web-session/token'),
      })

      const response = await finalFetcher<SessionUser>(GET_USER_REQUEST_URL)

      if (response === 'NEED_LOGIN') {
        return null
      }

      captureHttpError(response)

      if (response.ok === false) {
        return null
      }

      return response.parsedBody
    }
  }
}

function getUserAgent(req: IncomingMessage | undefined): string {
  return req ? req.headers['user-agent'] ?? '' : window.navigator.userAgent
}
