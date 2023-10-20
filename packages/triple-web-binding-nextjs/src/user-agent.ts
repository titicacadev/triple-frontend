import 'server-only'

import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'
import { UserAgent } from '@titicaca/triple-web'

export function getUserAgent(): UserAgent {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')
  const parser = new UAParser(userAgent ?? undefined)

  return {
    ...parser.getResult(),
  }
}
