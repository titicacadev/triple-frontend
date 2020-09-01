import React, { Fragment } from 'react'

export function FacebookOpenGraph({
  ogTitle = '실시간 여행 가이드 - 트리플',
  ogDescription,
  ogUrl = 'https://triple.guide/',
  ogType = 'website',
  ogLocale = 'ko_KR',
  ogImage,
  fbAppId = '136540730081853',
}: {
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  ogType?: string
  ogLocale?: string
  ogImage?: { url: string; width: number; height: number }
  fbAppId?: string
}) {
  return (
    <Fragment>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={ogLocale} />
      <meta
        property="og:image"
        content={
          ogImage?.url ||
          'https://assets.triple.guide/images/default-cover-image.jpg'
        }
      />
      {!ogImage || ogImage.width || ogImage.height ? (
        <>
          <meta
            property="og:image:width"
            content={encodeURIComponent(ogImage?.width || 1052)}
          />
          <meta
            property="og:image:height"
            content={encodeURIComponent(ogImage?.height || 1052)}
          />
        </>
      ) : null}
      <meta property="og:description" content={ogDescription || ''} />
      <meta property="fb:app_id" content={fbAppId} />
    </Fragment>
  )
}
