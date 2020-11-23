import React, { useMemo } from 'react'
import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

export function FacebookAppLinkMeta({
  appName = '트리플',
  iosAppStoreId = '1225499481',
  appPath = '/',
  appPackageName = 'com.titicacacorp.triple',
  appUrlScheme: appUrlSchemeFromProps = 'triple',
}: {
  appName?: string
  iosAppStoreId?: string
  appPath?: string
  appPackageName?: string
  /**
   * @deprecated EnvProvider가 있으면 이 prop을 넣어주지 않아도 됩니다.
   */
  appUrlScheme?: string
}) {
  const { appUrlScheme: appUrlSchemeFromContext } = useEnv()

  const appUrlScheme = useMemo(() => {
    if (appUrlSchemeFromContext) {
      return appUrlSchemeFromContext
    }
    if (typeof appUrlSchemeFromProps === 'string') {
      // TODO: 개발용 logger 만들기
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'appUrlScheme prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.',
        )
      }

      return appUrlSchemeFromProps
    }

    return 'triple'
  }, [appUrlSchemeFromContext, appUrlSchemeFromProps])

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
