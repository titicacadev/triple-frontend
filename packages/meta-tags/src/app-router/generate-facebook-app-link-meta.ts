import { Metadata } from 'next'

import { DEFAULT_APP_ID, DEFAULT_APP_PACKAGE_NAME } from '../constants'

export function generateFacebookAppLinkMeta({
  appName: appNameFromProps,
  appId = DEFAULT_APP_ID,
  appPath = '/',
  appPackageName = DEFAULT_APP_PACKAGE_NAME,
}: {
  appName?: string
  appId?: string
  appPath?: string
  appPackageName?: string
} = {}): Metadata {
  const appName = appNameFromProps ?? '트리플'
  const appUrlScheme = process.env.NEXT_PUBLIC_APP_URL_SCHEME || ''
  const url = `${appUrlScheme}://${appPath}`

  return {
    appLinks: {
      ios: {
        app_name: appName,
        url,
        app_store_id: appId,
      },
      android: {
        app_name: appName,
        url,
        package: appPackageName,
      },
    },
  }
}
