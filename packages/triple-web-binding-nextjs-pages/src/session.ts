import { NextPageContext } from 'next'
import { SessionUser } from '@titicaca/triple-web'
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
export async function getSession(
  ctx: NextPageContext,
): Promise<SessionProviderValue> {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent'] ?? ''
    : window.navigator.userAgent

  const isClientApp = checkClientApp(userAgent)

  const user = await fetchUser(ctx, isClientApp)

  return {
    initialSession: {
      user,
    },
  }
}

async function fetchUser(ctx: NextPageContext, isClientApp: boolean) {
  if (ctx.req) {
    // Server-side

    // 세션이 없으면 fetch를 스킵합니다.
    const cookies = new Cookies(ctx.req.headers.cookie)

    let hasSession = false

    if (isClientApp) {
      hasSession = !!cookies.get('x-soto-session')
    } else {
      hasSession = !!ctx.req.headers['x-triple-web-login']
      if (process.env.NODE_ENV !== 'production') {
        hasSession = !!cookies.get('TP_SE')
      }
    }

    if (!hasSession) {
      return null
    }

    // fetch 시작
    const ssrFetcherizeOptions = {
      apiUriBase: process.env.API_URI_BASE || '',
      cookie: ctx.req.headers.cookie,
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
