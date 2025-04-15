import {
  authFetcherize,
  captureHttpError,
  get,
  post,
  ssrFetcherize,
} from '@titicaca/fetcher'
import { GET_USER_REQUEST_URL } from '@titicaca/triple-web-utils'
import Cookies from 'universal-cookie'
import { SESSION_KEY, TP_TK } from '@titicaca/constants'

import { SessionUser } from './types'

export function checkSession(cookie?: string) {
  const cookies = new Cookies(cookie)
  return !!cookies.get(TP_TK) || !!cookies.get(SESSION_KEY)
}

export async function fetchUser({ cookie }: { cookie?: string }) {
  if (!checkSession(cookie)) {
    return null
  }

  const ssrFetcherizeOptions = {
    apiUriBase: process.env.API_URI_BASE || '',
    cookie,
  }

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
