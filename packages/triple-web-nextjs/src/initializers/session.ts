import 'server-only'

import { cookies, headers } from 'next/headers'
import {
  ssrFetcherize,
  captureHttpError,
  authFetcherize,
  post,
  get,
} from '@titicaca/fetcher'
import type { SessionUser, SessionValue } from '@titicaca/triple-web'
import {
  GET_USER_REQUEST_URL,
  checkClientApp,
} from '@titicaca/triple-web-utils'
import { SESSION_KEY, TP_TK } from '@titicaca/constants'

/**
 * - app: refresh X
 * - browser: refresh O
 * @returns
 */
export async function getSession(): Promise<SessionValue> {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') ?? ''

  const isClientApp = checkClientApp(userAgent)
  const hasSession = checkSession()

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

function checkSession() {
  const cookiesList = cookies()

  return cookiesList.has(TP_TK) || cookiesList.has(SESSION_KEY)
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
