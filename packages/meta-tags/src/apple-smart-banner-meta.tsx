import Head from 'next/head'
import { useEnv } from '@titicaca/triple-web/env'

import { DEFAULT_APP_ID } from './constants'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 generateAppleSmartBannerMeta를 사용해주세요
 */
export function AppleSmartBannerMeta({
  appId = DEFAULT_APP_ID,
  appPath = '/',
}: {
  appId?: string
  appPath?: string
}) {
  const { appUrlScheme } = useEnv()

  return (
    <Head>
      <meta
        name="apple-itunes-app"
        content={`app-id=${appId}, app-argument=${appUrlScheme}://${appPath}`}
      />
    </Head>
  )
}
