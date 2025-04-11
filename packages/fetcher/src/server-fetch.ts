import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies as getCookies } from 'next/headers'
import Cookies from 'universal-cookie'

import { fetcher } from './fetcher'
import { del, get, post, put } from './methods'
import { BaseFetcher } from './factories'

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
  return ((href, options) => {
    const { cookie: overridingCookie } = options || {}
    const finalCookie = removeInvalidCookies(
      overridingCookie ?? getCookies().toString(),
    )

    return fetcher(href, {
      ...options,
      ...(finalCookie && { cookie: finalCookie }),
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
  cookieMap.forEach(([name, value]) => {
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
