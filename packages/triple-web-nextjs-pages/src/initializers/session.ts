/* eslint-disable no-console */
import type { NextPageContext } from 'next'
import type { SessionUser, SessionValue } from '@titicaca/triple-web'
import {
  ssrFetcherize,
  captureHttpError,
  authFetcherize,
  post,
  get,
} from '@titicaca/fetcher'
import { GET_USER_REQUEST_URL } from '@titicaca/triple-web-utils'

import { checkSession } from '../helpers/session'

/**
 * @returns
 */
export async function getSession(ctx: NextPageContext): Promise<SessionValue> {
  const user = await fetchUser(ctx)

  return {
    user,
  }
}

async function fetchUser(ctx: NextPageContext) {
  if (ctx.req) {
    // Server-side
    const hasSession = checkSession(ctx.req)

    // 세션이 없으면 fetch를 스킵합니다.
    if (!hasSession) {
      return null
    }

    // fetch 시작
    const ssrFetcherizeOptions = {
      apiUriBase: process.env.API_URI_BASE || '',
      cookie: ctx.req.headers.cookie,
    }
    console.log('fetchUser - ssrFetcherizeOptions', ssrFetcherizeOptions)
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
  } else {
    // Client-side

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
