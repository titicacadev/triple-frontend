import React from 'react'
import Head from 'next/head'

export function FacebookAppLinkMeta({
  appName = '트리플',
  iosAppStoreId = '1225499481',
  appPath = '/',
  appPackageName = 'com.titicacacorp.triple',
  appUrlScheme = 'triple',
}: {
  appName?: string
  iosAppStoreId?: string
  appPath?: string
  appPackageName?: string
  appUrlScheme?: string
}) {
  return (
    <Head>
      <meta
        key="al-ios-app-name"
        property="al:ios:app_name"
        content={appName}
      />
      <meta
        key="al-android-app-name"
        property="al:android:app_name"
        content={appName}
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
