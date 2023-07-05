'use server'

import {
  fetcher,
  post,
  ssrFetcherize,
  authFetcherize,
} from '@titicaca/fetcher/server'
import { headers } from 'next/headers'

import { User } from '../../types'

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

  if (response === 'NEED_LOGIN' || response.status === 401 || !response.ok) {
    return undefined
  }

  return response.parsedBody
}
