import 'server-only'

import { cookies, headers } from 'next/headers'
import {
  ssrFetcherize,
  captureHttpError,
  authFetcherize,
  post,
  get,
} from '@titicaca/fetcher'
import { SessionUser, SessionValue } from '@titicaca/triple-web'
import {
  GET_USER_REQUEST_URL,
  checkClientApp,
} from '@titicaca/triple-web-utils'

/**
 * - app: refresh X
 * - browser: refresh O
 * @returns
 */
export async function getSession(): Promise<SessionValue> {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') ?? ''

  const isClientApp = checkClientApp(userAgent)
  const hasSession = checkSession(isClientApp)

  if (!hasSession) {
    return {
      user: null,
    }
  }

  const user = await fetchUser(isClientApp)

  return {
    user,
  }
}

function checkSession(isClientApp: boolean) {
  const headersList = headers()
  const cookiesList = cookies()

  let hasSession = false

  if (isClientApp) {
    hasSession = cookiesList.has('x-soto-session')
  } else {
    hasSession = headersList.has('x-triple-web-login')

    if (process.env.NODE_ENV !== 'production') {
      hasSession = cookiesList.has('TP_SE')
    }
  }

  return hasSession
}

async function fetchUser(isClientApp: boolean) {
  const headersList = headers()

  const ssrFetcherizeOptions = {
    apiUriBase: process.env.API_URI_BASE || '',
    cookie: headersList.get('cookie') ?? undefined,
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
}
