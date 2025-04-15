import 'server-only'

import { headers } from 'next/headers'
import type { UserAgentValue } from '@titicaca/triple-web'
import { getUserAgent as extractUserAgent } from '@titicaca/triple-web'

export function getUserAgent(): UserAgentValue {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')
  return extractUserAgent(userAgent || undefined)
}
