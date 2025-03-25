import { NextRequest } from 'next/server'
import { clientAppRegex } from '@titicaca/triple-web-utils'

export function getIsTripleApp(request: NextRequest) {
  const userAgent = request.headers.get('User-Agent')
  const tripleAppMetadata = userAgent ? clientAppRegex.exec(userAgent) : null

  return !!tripleAppMetadata
}
