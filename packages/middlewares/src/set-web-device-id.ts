import { randomUUID } from 'crypto'

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { CustomMiddleware } from './types'
import { getIsTripleApp } from './utils/get-triple-app'
import { X_TRIPLE_WEB_DEVICE_ID } from './constants'

export function setWebDeviceIdMiddleware(customMiddleware: CustomMiddleware) {
  return function middleware(request: NextRequest, event: NextFetchEvent) {
    const response = NextResponse.next()
    const isTripleApp = getIsTripleApp(request)

    if (isTripleApp) {
      return customMiddleware(request, event, response)
    }

    const allCookies = request.cookies.getAll()
    const hasWebDeviceId = allCookies.some(
      ({ name }) => name === X_TRIPLE_WEB_DEVICE_ID,
    )

    if (!hasWebDeviceId) {
      const randomWebDeviceId = randomUUID()
      response.cookies.set(X_TRIPLE_WEB_DEVICE_ID, randomWebDeviceId)
    }

    return customMiddleware(request, event, response)
  }
}
