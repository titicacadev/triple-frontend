import React from 'react'
import Head from 'next/head'

export function AppleSmartBannerMeta({
  appId = '1225499481',
  appUrlScheme = 'triple',
  appPath = '/',
}: {
  appId?: string
  appUrlScheme?: string
  appPath?: string
}) {
  return (
    <Head>
      <meta
        name="apple-itunes-app"
        content={`app-id=${appId}, app-argument=${appUrlScheme}://${appPath}`}
      />
    </Head>
  )
}
