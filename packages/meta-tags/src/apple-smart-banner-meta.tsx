import Head from 'next/head'
import { useEnv } from '@titicaca/triple-web'

import { DEFAULT_APP_ID } from './constants'

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
