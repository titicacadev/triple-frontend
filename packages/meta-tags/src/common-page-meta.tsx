import React, { Fragment } from 'react'

export function CommonPageMeta({
  fbAppId,
  appStoreId,
  appName,
  appPackageName,
  canonical,
}: {
  fbAppId: string
  appStoreId: string
  appName?: string
  appPackageName?: string
  canonical?: string
}) {
  return (
    <Fragment>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"
      />
      <meta
        property="al:ios:app_store_id"
        content={appStoreId || '1225499481'}
      />
      <meta property="al:ios:app_name" content={appName || '트리플'} />
      <meta
        name="apple-itunes-app"
        content={`app-id=${appStoreId || '1225499481'}, app-argument=${
          appPackageName || 'com.titicacacorp.triple'
        }:///`}
      />
      <meta
        property="al:android:package"
        content={appPackageName || 'com.titicacacorp.triple'}
      />
      <meta property="al:android:app_name" content={appName || '트리플'} />
      <meta property="fb:app_id" content={fbAppId} />
      <meta name="msapplication-TileColor" content="#1FC1B6" />
      <meta
        name="msapplication-TileImage"
        content="https://triple.guide/icons/favicon-144x144.png"
      />
      <link rel="canonical" href={canonical || 'https://triple.guide/'} />
      <link
        rel="apple-touch-icon-precomposed"
        href="https://triple.guide/icons/favicon-152x152.png"
      />
    </Fragment>
  )
}
