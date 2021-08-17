import Cookies from 'universal-cookie'

import { RequestOptions } from './types'

export function makeRequestParams(
  href: string,
  {
    req,
    useBodyAsRaw,
    retryable,
    body,
    headers: customHeaders,
    cookie: cookieFromOptions,
    withApiUriBase,
    ...rest
  }: RequestOptions,
): [string, RequestInit | undefined] {
  if (req && !process.env.API_URI_BASE) {
    throw new Error(
      'Insufficient environment variables in `.env.*` files\n- API_URI_BASE',
    )
  }

  const baseUrl: string =
    req || withApiUriBase ? (process.env.API_URI_BASE as string) : ''

  const reqUrl: string = baseUrl + href

  const cookie = cookieFromOptions ?? req?.headers.cookie

  const sessionId = cookie
    ? new Cookies(cookie).get('x-soto-session')
    : undefined

  const headers = {
    ...customHeaders,
    ...(body && !useBodyAsRaw && { 'Content-Type': 'application/json' }),
    ...(sessionId && { 'X-Soto-Session': sessionId }),
    ...(cookie && { cookie }),
  }

  return [
    reqUrl,
    {
      credentials: 'same-origin',
      headers,
      body: body
        ? useBodyAsRaw
          ? (body as BodyInit)
          : JSON.stringify(body)
        : undefined,
      ...rest,
    },
  ]
}
