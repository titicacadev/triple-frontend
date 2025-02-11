import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import satisfies from 'semver/functions/satisfies'

import { parseApp } from '../user-agent-context'

import { CustomMiddleware } from './chain'

/**
 * TF 13.42.1의 react-contexts/src/middleware 참고하여 작성
 * https://github.com/titicacadev/triple-frontend/blob/8d002e80f9ff187d6a06b6a2695c48f1d5383662/packages/react-contexts/src/middleware.ts
 */
export function oldTripleIosCookiesMiddleware(
  customMiddleware: CustomMiddleware,
) {
  return function middleware(request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next()

    const userAgent = request.headers.get('User-Agent')

    const host = request.headers.get('x-forwarded-host')

    const tripleApp = userAgent ? parseApp(userAgent) : null

    if (!userAgent || (host && !!tripleApp)) {
      return customMiddleware(request, event, response)
    }

    try {
      const oldVersionRange = '< 6.5.5'
      const isOldIosApp =
        tripleApp &&
        tripleApp.name === 'Triple-iOS' &&
        satisfies(tripleApp.version, oldVersionRange, {
          includePrerelease: true,
        })

      if (isOldIosApp) {
        const cookies = request.cookies.getAll()

        cookies.forEach((cookie) => {
          response.cookies.set(cookie.name, cookie.value)
        })
      }
    } catch {
      // semver 파싱 에러가 발생하면 ignore 합니다.
    }

    return customMiddleware(request, event, response)
  }
}
