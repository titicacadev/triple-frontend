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
          'appUrlScheme prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.\nhttps://github.com/titicacadev/triple-frontend/blob/ab1648a7cdb684ee2752eb5b80eed02940106964/packages/react-contexts/src/env-context/README.md#%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%98%EB%8A%94-%EB%B2%95',
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
