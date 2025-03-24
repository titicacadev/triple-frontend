import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { v4 as uuidV4 } from 'uuid'
import { X_TRIPLE_WEB_DEVICE_ID } from '@titicaca/constants'
import { parseUrl } from '@titicaca/view-utilities'

import { getIsTripleApp } from './utils/get-triple-app'
import { applySetCookie } from './utils/apply-set-cookie'

export function setWebDeviceIdMiddleware(next: NextMiddleware) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
  ) {
    const response = (await next(request, event)) as NextResponse
    const isTripleApp = getIsTripleApp(request)

    if (isTripleApp) {
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
        domain: getDomain(request),
      })
      applySetCookie(request, response)
    }

    return response
  }
}

function getDomain(request: NextRequest) {
  const hostFromRequest = request.headers.get('host')
  const isLocalhost = hostFromRequest?.split(':')[0] === 'localhost'
  const { host } = parseUrl(process.env.NEXT_PUBLIC_WEB_URL_BASE)

  return isLocalhost ? 'localhost' : `.${host}`
}
