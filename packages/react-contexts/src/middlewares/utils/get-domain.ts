import { parseUrl } from '@titicaca/view-utilities'
import { NextRequest } from 'next/server'

export function getDomain(request: NextRequest) {
  const hostFromRequest = request.headers.get('host')
  const isLocalhost = hostFromRequest?.split(':')[0] === 'localhost'
  const { host } = parseUrl(process.env.NEXT_PUBLIC_WEB_URL_BASE)

  return isLocalhost ? 'localhost' : `.${host}`
}
