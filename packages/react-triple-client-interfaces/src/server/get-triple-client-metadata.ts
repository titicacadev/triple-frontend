'use server'

import { headers } from 'next/headers'

import { parseTripleClientUserAgent } from '../triple-client-user-agent'

/**
  (구)TripleClientMetadataProvider.getInitialProps의 next v13 app router 버전입니다. 
*/
export function getTripleClientMetadata() {
  const headerInstance = headers()
  const serverSideUserAgent = headerInstance.get('user-agent')
  const userAgent =
    serverSideUserAgent ||
    (typeof window !== 'undefined' ? window.navigator.userAgent : '')

  return parseTripleClientUserAgent(userAgent)
}
