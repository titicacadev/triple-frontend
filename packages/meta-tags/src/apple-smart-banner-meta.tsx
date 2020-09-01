import React from 'react'

export function AppleSmartBannerMeta({
  appId,
  appArgument,
}: {
  appId?: string
  appArgument?: string
}) {
  return (
    <meta
      name="apple-itunes-app"
      content={`app-id=${appId || '1225499481'}, app-argument=${
        appArgument || 'com.titicacacorp.triple:///'
      }`}
    />
  )
}
