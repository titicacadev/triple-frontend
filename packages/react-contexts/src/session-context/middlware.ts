import { NextMiddleware, NextRequest, NextResponse } from 'next/server'

import { parseApp } from '../user-agent-context'

export const middleware: NextMiddleware = (request: NextRequest) => {
  const response = NextResponse.next()

  const userAgent = request.headers.get('User-Agent')
  const isIosApp = userAgent
    ? parseApp(userAgent)?.name === 'Triple-iOS'
    : false

  if (!isIosApp) {
    return response
  }

  const cookies = request.cookies.getAll()

  cookies.forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value)
  })

  return response
}
