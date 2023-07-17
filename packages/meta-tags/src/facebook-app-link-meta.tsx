import Head from 'next/head'
import { useTranslation } from '@titicaca/next-i18next'
import { useEnv } from '@titicaca/react-contexts'

import { DEFAULT_APP_ID, DEFAULT_APP_PACKAGE_NAME } from './constants'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 generateFacebookAppLinkMeta를 사용해주세요
 */
export function FacebookAppLinkMeta({
  appName,
  iosAppStoreId = DEFAULT_APP_ID,
  appPath = '/',
  appPackageName = DEFAULT_APP_PACKAGE_NAME,
}: {
  appName?: string
  iosAppStoreId?: string
  appPath?: string
  appPackageName?: string
}) {
  const { t } = useTranslation('common-web')

  const { appUrlScheme } = useEnv()

  return (
    <Head>
      <meta
        key="al-ios-app-name"
        property="al:ios:app_name"
        content={appName ?? t(['teuripeul', '트리플'])}
      />
      <meta
        key="al-android-app-name"
        property="al:android:app_name"
        content={appName ?? t(['teuripeul', '트리플'])}
      />
      <meta
        key="al-ios-url"
        property="al:ios:url"
        content={`${appUrlScheme}://${appPath}`}
      />
      <meta
        key="al-ios-app-store-id"
        property="al:ios:app_store_id"
        content={iosAppStoreId}
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
