import { Metadata } from 'next'

import { DEFAULT_APP_ID } from '../constants'

export function generateAppleSmartBannerMeta({
  appId = DEFAULT_APP_ID,
  appPath = '/',
}: {
  appId?: string
  appPath?: string
} = {}): Metadata {
  const appUrlScheme = process.env.NEXT_PUBLIC_APP_URL_SCHEME || ''

  return {
    itunes: {
      appId,
      appArgument: `${appUrlScheme}://${appPath}`,
    },
  }
}
