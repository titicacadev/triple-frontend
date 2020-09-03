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
      <meta property="al:ios:app_name" content={appName} />
      <meta property="al:android:app_name" content={appName} />
      <meta property="al:ios:url" content={`${appUrlScheme}://${appPath}`} />
      <meta property="al:ios:app_store_id" content={iosAppStoreId} />
      <meta
        property="al:android:url"
        content={`${appUrlScheme}://${appPath}`}
      />
      <meta property="al:android:package" content={appPackageName} />
    </Head>
  )
}
