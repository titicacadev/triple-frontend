import { NextMiddleware, NextRequest, NextResponse } from 'next/server'
import satisfies from 'semver/functions/satisfies'

import { parseApp } from './user-agent-context'

export const middleware: NextMiddleware = (request: NextRequest) => {
  const response = NextResponse.next()

  const userAgent = request.headers.get('User-Agent')

  if (!userAgent) {
    return response
  }

  const app = parseApp(userAgent)

  try {
    const oldVersionRange = '< 6.5.0'
    const isOldIosApp =
      app &&
      app.name === 'Triple-iOS' &&
      satisfies(app.version, oldVersionRange)

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
