import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 createAppleSmartBannerMeta를 사용해주세요
 */
export function AppleSmartBannerMeta({
  appId = '1225499481',
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
