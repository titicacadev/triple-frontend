import React from 'react'

export function AppleSmartBannerMeta({
  appId = '1225499481',
  appArgumentScheme = 'com.titicacacorp.triple://',
  appArgumentPath = '',
}: {
  appId?: string
  appArgumentScheme?: string
  appArgumentPath?: string
}) {
  return (
    <meta
      name="apple-itunes-app"
      content={`app-id=${appId}, app-argument=${appArgumentScheme}${appArgumentPath}/`}
    />
  )
}
