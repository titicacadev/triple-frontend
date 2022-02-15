import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

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
