import { isTripleHref, RequestOptions } from '@titicaca/fetcher'
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'

import { getDomain } from '../utils/get-domain'

import { getSessionRefreshResponse } from './refresh-session'

export function clientRefreshSessionMiddleware(next: NextMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const response = (await next(request, event)) as NextResponse
    const url = request.nextUrl
    const headers = request.headers

    const requestFromTriple =
      isTripleHref(request.url) || getDomain(request) === 'localhost'

    if (
      requestFromTriple &&
      url.pathname.startsWith('/api') &&
      !isServerRequest(headers)
    ) {
      const apiResponse = await fetch(request)

      if (apiResponse.status !== 401) {
        return new NextResponse(apiResponse.body, {
          status: apiResponse.status,
          statusText: apiResponse.statusText,
          headers: apiResponse.headers,
        })
      }

      const options: RequestOptions = {
        withApiUriBase: true,
        cookie: request.cookies
          .getAll()
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join('; '),
      }

      const sessionRefreshResponse = await getSessionRefreshResponse({
        next,
        request,
        event,
        options,
      })

      return sessionRefreshResponse || response
    }

    return response
  }
}

function isServerRequest(headers: NextRequest['headers']): boolean {
  return !!headers.get('x-triple-from-ssr')
}
