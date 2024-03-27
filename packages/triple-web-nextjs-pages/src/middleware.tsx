import { clientAppRegex } from '@titicaca/triple-web-utils'
import { NextMiddleware, NextRequest, NextResponse } from 'next/server'
import satisfies from 'semver/functions/satisfies'

export const middleware: NextMiddleware = (request: NextRequest) => {
  const response = NextResponse.next()

  const userAgent = request.headers.get('User-Agent')

  if (!userAgent) {
    return response
  }

  const metadata = clientAppRegex.exec(userAgent)

  try {
    const oldVersionRange = '< 6.5.5'
    const isOldIosApp =
      metadata &&
      metadata[1] === 'Triple-iOS' &&
      satisfies(metadata[2], oldVersionRange, {
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

  return response
}
