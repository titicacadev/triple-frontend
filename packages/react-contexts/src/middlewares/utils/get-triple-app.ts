import { NextRequest } from 'next/server'

import { parseApp } from '../../user-agent-context'

export function getTripleApp(request: NextRequest) {
  const userAgent = request.headers.get('User-Agent')
  const tripleApp = userAgent ? parseApp(userAgent) : null

  return tripleApp
}
