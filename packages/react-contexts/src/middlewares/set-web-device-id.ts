import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { v4 as uuidV4 } from 'uuid'
import { X_TRIPLE_WEB_DEVICE_ID } from '@titicaca/constants'

import { getTripleApp } from './utils/get-triple-app'
import { applySetCookie } from './utils/apply-set-cookie'

export function setWebDeviceIdMiddleware(next: NextMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const response = (await next(request, event)) as NextResponse
    const tripleApp = getTripleApp(request)

    if (tripleApp) {
      return response
    }

    const allCookies = request.cookies.getAll()
    const hasWebDeviceId = allCookies.some(
      ({ name }) => name === X_TRIPLE_WEB_DEVICE_ID,
    )

    if (!hasWebDeviceId && response?.cookies) {
      const randomWebDeviceId = uuidV4()
      response.cookies.set(X_TRIPLE_WEB_DEVICE_ID, randomWebDeviceId, {
        secure: true,
      })
      applySetCookie(request, response)
    }

    return response
  }
}
