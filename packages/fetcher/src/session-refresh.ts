import { parseString, splitCookiesString } from 'set-cookie-parser'

import { ssrFetcherize } from './factories'
import { post } from './methods'
import { RequestOptions } from './types'

export type SetCookie = Record<string, string>
/**
 *
 * @param fetcher post 함수
 * @param options fetcher에 전달할 옵션
 * @returns session 갱신이 성공한 경우에는 새로운 쿠키를 key: set-cookie 값의 형태로 반환하고, 실패한 경우에는 undefined를 반환합니다.
 * ex) TP_SE : 'TP_SE=some session token; Path=/; HttpOnly; Secure'
 */
export async function sessionRefresh({
  fetcher = post,
  options,
}: {
  fetcher?: typeof post
  options?: RequestOptions
}): Promise<SetCookie | undefined> {
  const response = await fetcher<Record<never, never> | { message: string }>(
    '/api/users/web-session/token',
    options,
  )
  if (response.ok) {
    const setCookie = response.headers.get('set-cookie')
    if (setCookie) {
      const setCookies = splitCookiesString(setCookie)
      const setCookiesMap: SetCookie = {}
      setCookies.forEach((cookie) => {
        const { name } = parseString(cookie)
        setCookiesMap[name] = cookie
      })
      return setCookiesMap
    }
  }
  return undefined
}

export async function sessionRefreshOnSSR({
  apiUriBase,
  cookie,
  options: initialOptions,
}: {
  apiUriBase: string
  cookie: string
  options?: Omit<RequestOptions, 'cookie'>
}) {
  const fetch = ssrFetcherize(post, { apiUriBase, cookie })
  return async () => {
    await sessionRefresh({ fetcher: fetch, options: initialOptions })
  }
}
