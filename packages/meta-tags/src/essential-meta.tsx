import React from 'react'
import Head from 'next/head'

export function EssentialMeta({
  description = '',
  canonicalUrl = 'https://triple.guide/',
}: {
  description?: string
  canonicalUrl?: string
}) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"
      />
      <meta name="description" content={description} />
      <meta
        name="msapplication-TileImage"
        content="https://triple.guide/icons/favicon-144x144.png"
      />
      <meta name="msapplication-TileColor" content="#1FC1B6" />
      <link
        rel="apple-touch-icon-precomposed"
        href="https://triple.guide/icons/favicon-152x152.png"
      />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
