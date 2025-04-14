import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import Cookies from 'universal-cookie'

import { fetcher } from './fetcher'
import { del, get, post, put } from './methods'
import { BaseFetcher } from './factories'
import { RequestOptions } from './types'

export const serverFetchers = {
  fetcher: serverFetcherize((href, options) => fetcher(href, options || {})),
  get: serverFetcherize(get),
  post: serverFetcherize(post),
  put: serverFetcherize(put),
  del: serverFetcherize(del),
}

export function serverFetcherize<Fetcher extends BaseFetcher>(
  fetcher: Fetcher,
): Fetcher {
  return (async (href, options: RequestOptions) => {
    const isServer = typeof window === 'undefined'
    let serverCookie: string | undefined

    if (isServer) {
      const { cookies } = await import('next/headers')

      serverCookie = cookies().toString()
    }

    const finalCookie = options?.cookie ?? serverCookie
    const validCookies = finalCookie
      ? removeInvalidCookies(finalCookie)
      : undefined

    return fetcher(href, {
      ...options,
      ...(validCookies && { cookie: validCookies }),
      withApiUriBase: true,
      headers: {
        ...options?.headers,
        'x-triple-from-ssr': 'true',
      },
    })
  }) as Fetcher
}

export function removeInvalidCookies(_cookies: string) {
  const validCookies = new Cookies()
  const cookieMap = parseCookie(_cookies)
  cookieMap.forEach((value, name) => {
    if (isValidCookieValue(value)) {
      validCookies.set(name, value)
    }
  })
  return validCookies.getAll<string>()
}

function isValidCookieValue(value?: string | null) {
  return (
    value !== undefined &&
    value !== null &&
    value !== 'null' &&
    value !== 'undefined' &&
    value.length > 0
  )
}
