import React, { Fragment } from 'react'

export function FacebookAppLink({
  appName,
  iosAppStoreId,
  contentUrl,
  appPackageName,
  appUrlScheme,
}: {
  appName?: string
  iosAppStoreId?: string
  contentUrl?: string
  appPackageName?: string
  appUrlScheme?: string
}) {
  return (
    <Fragment>
      <meta property="al:ios:app_name" content={appName || '트리플'} />
      <meta property="al:android:app_name" content={appName || '트리플'} />
      <meta
        property="al:ios:url"
        content={`${appPackageName || 'com.titicacacorp.triple'}://${
          contentUrl || '/'
        }`}
      />
      <meta
        property="al:ios:app_store_id"
        content={iosAppStoreId || '1225499481'}
      />
      <meta
        property="al:android:url"
        content={`${appUrlScheme || 'triple'}://${contentUrl || '/'}`}
      />
      <meta
        property="al:android:package"
        content={appPackageName || 'com.titicacacorp.triple'}
      />
    </Fragment>
  )
}
