import React from 'react'

export function AppleSmartBannerMeta({
  appId = '1225499481',
  appArgument = 'com.titicacacorp.triple:///',
}: {
  appId?: string
  appArgument?: string
}) {
  return (
    <meta
      name="apple-itunes-app"
      content={`app-id=${appId}, app-argument=${appArgument}`}
    />
  )
}
