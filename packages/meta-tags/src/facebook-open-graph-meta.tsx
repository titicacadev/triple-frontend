import React from 'react'
import Head from 'next/head'

export function FacebookOpenGraphMeta({
  title = '실시간 여행 가이드 - 트리플',
  description = '',
  canonicalUrl = 'https://triple.guide/',
  type = 'website',
  locale = 'ko_KR',
  image = {
    url: 'https://assets.triple.guide/images/default-cover-image.jpg',
    width: 1052,
    height: 1052,
  },
  fbAppId = '136540730081853',
}: {
  title?: string
  description?: string
  canonicalUrl?: string
  type?: string
  locale?: string
  image?: { url: string; width?: number; height?: number }
  fbAppId?: string
}) {
  return (
    <Head>
      <meta key="og-title" property="og:title" content={title} />
      <meta key="og-url" property="og:url" content={canonicalUrl} />
      <meta key="og-type" property="og:type" content={type} />
      <meta key="og-locale" property="og:locale" content={locale} />
      <meta key="og-image" property="og:image" content={image?.url} />
      {image?.width && image?.height ? (
        <>
          <meta
            key="og-image-width"
            property="og:image:width"
            content={image.width.toString()}
          />
          <meta
            key="og-image-height"
            property="og:image:height"
            content={image.height.toString()}
          />
        </>
      ) : null}
      <meta
        key="og-description"
        property="og:description"
        content={description}
      />
      <meta key="fb-app-id" property="fb:app_id" content={fbAppId} />
    </Head>
  )
}
