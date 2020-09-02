import React from 'react'

export function AppleSmartBannerMeta({
  appId = '1225499481',
  appUrlScheme = 'com.titicacacorp.triple',
  appPath = '/',
}: {
  appId?: string
  appUrlScheme?: string
  appPath?: string
}) {
  return (
    <meta
      name="apple-itunes-app"
      content={`app-id=${appId}, app-argument=${appUrlScheme}://${appPath}`}
    />
  )
}
