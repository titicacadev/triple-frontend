import React, { useMemo } from 'react'
import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

export function AppleSmartBannerMeta({
  appId = '1225499481',
  appUrlScheme: appUrlSchemeFromProps,
  appPath = '/',
}: {
  appId?: string
  /**
   * @deprecated EnvProvider가 있으면 이 prop을 넣어주지 않아도 됩니다.
   */
  appUrlScheme?: string
  appPath?: string
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
        name="apple-itunes-app"
        content={`app-id=${appId}, app-argument=${appUrlScheme}://${appPath}`}
      />
    </Head>
  )
}
