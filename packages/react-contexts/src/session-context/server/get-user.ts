'use server'

import {
  ssrFetcherize,
  authFetcherize,
  // captureHttpError,
} from '@titicaca/fetcher/lib/factories'
import { fetcher } from '@titicaca/fetcher/lib/fetcher'
import { post } from '@titicaca/fetcher/lib/methods'
import { headers } from 'next/headers'

import { User } from '../types'

export async function getUser(): Promise<User | undefined> {
  const cookie = headers().get('cookie') ?? ''
  const ssrFetcherizeOptions = {
    apiUriBase: process.env.API_URI_BASE || '',
    cookie,
  }
  const userFetcher = authFetcherize(
    ssrFetcherize(
      (href, options) => fetcher(href, options || {}),
      ssrFetcherizeOptions,
    ),
    {
      refresh: () =>
        ssrFetcherize(
          post,
          ssrFetcherizeOptions,
        )('/api/users/web-session/token'),
    },
  )

  const response = await userFetcher<User>('/api/users/me')

  if (response === 'NEED_LOGIN' || response.status === 401) {
    return undefined
  }

  // captureHttpError(response)

  if (response.ok === false) {
    return undefined
  }

  return response.parsedBody
}
