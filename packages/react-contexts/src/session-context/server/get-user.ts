'use client'

import {
  fetcher,
  ssrFetcherize,
  captureHttpError,
  authFetcherize,
  post,
} from '@titicaca/fetcher'
import { cookies } from 'next/headers'

import { User } from '../types'

export async function getUser(): Promise<User | undefined> {
  const cookie = cookies().getAll().toString()
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

  captureHttpError(response)

  if (response.ok === false) {
    return undefined
  }

  return response.parsedBody
}
