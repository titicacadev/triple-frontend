import React, { Fragment } from 'react'

export function FacebookOpenGraph({
  ogTitle,
  ogDescription,
  ogUrl,
  ogType,
  ogLocale,
  ogImage,
  fbAppId,
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
      <meta
        property="og:title"
        content={ogTitle || '실시간 여행 가이드 - 트리플'}
      />
      <meta property="og:url" content={ogUrl || 'https://triple.guide/'} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:locale" content={ogLocale || 'ko_KR'} />
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
      <meta
        property="og:description"
        content={ogDescription || '최신 가이드북 제공, 길찾기 탑재, 맛집 추천'}
      />
      <meta property="fb:app_id" content={fbAppId || '136540730081853'} />
    </Fragment>
  )
}
