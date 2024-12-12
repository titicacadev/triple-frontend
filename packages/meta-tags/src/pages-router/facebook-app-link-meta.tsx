import Head from 'next/head'
import { useEnv, useTranslation } from '@titicaca/triple-web'

import { DEFAULT_APP_ID, DEFAULT_APP_PACKAGE_NAME } from '../constants'

export function FacebookAppLinkMeta({
  appName,
  appId = DEFAULT_APP_ID,
  appPath = '/',
  appPackageName = DEFAULT_APP_PACKAGE_NAME,
}: {
  appName?: string
  appId?: string
  appPath?: string
  appPackageName?: string
}) {
  const t = useTranslation()

  const { appUrlScheme } = useEnv()

  return (
    <Head>
      <meta
        key="al-ios-app-name"
        property="al:ios:app_name"
        content={appName ?? t('트리플')}
      />
      <meta
        key="al-android-app-name"
        property="al:android:app_name"
        content={appName ?? t('트리플')}
      />
      <meta
        key="al-ios-url"
        property="al:ios:url"
        content={`${appUrlScheme}://${appPath}`}
      />
      <meta
        key="al-ios-app-store-id"
        property="al:ios:app_store_id"
        content={appId}
      />
      <meta
        key="al-android-url"
        property="al:android:url"
        content={`${appUrlScheme}://${appPath}`}
      />
      <meta
        key="al-android-package"
        property="al:android:package"
        content={appPackageName}
      />
    </Head>
  )
}
