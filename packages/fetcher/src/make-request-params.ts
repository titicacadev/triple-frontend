import Cookies from 'universal-cookie'

import { RequestOptions } from './types'

export function makeRequestParams(
  href: string,
  {
    req,
    cookie = req?.headers.cookie,
    withApiUriBase = !!req,
    useBodyAsRaw,
    body,
    headers: customHeaders,
    retryable: _,
    ...rest
  }: RequestOptions,
): [string, RequestInit | undefined] {
  if (withApiUriBase && !process.env.API_URI_BASE) {
    throw new Error(
      'Insufficient environment variables in `.env.*` files\n- API_URI_BASE',
    )
  }

  const baseUrl: string = withApiUriBase
    ? (process.env.API_URI_BASE as string)
    : ''

  const reqUrl: string = baseUrl + href

  const sessionId = cookie
    ? new Cookies(cookie).get('x-soto-session')
    : undefined

  const headers = {
    ...customHeaders,
    ...(!!body && !useBodyAsRaw && { 'content-type': 'application/json' }),
    ...(sessionId && { 'x-soto-session': sessionId }),
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
