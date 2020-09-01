import React, { Fragment } from 'react'

export function FacebookOpenGraph({
  title = '실시간 여행 가이드 - 트리플',
  description,
  url = 'https://triple.guide/',
  type = 'website',
  locale = 'ko_KR',
  image,
  fbAppId = '136540730081853',
}: {
  title?: string
  description?: string
  url?: string
  type?: string
  locale?: string
  image?: { url: string; width: number; height: number }
  fbAppId?: string
}) {
  return (
    <Fragment>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta
        property="og:image"
        content={
          image?.url ||
          'https://assets.triple.guide/images/default-cover-image.jpg'
        }
      />
      {!image || (image.width && image.height) ? (
        <>
          <meta
            property="og:image:width"
            content={encodeURIComponent(image?.width || 1052)}
          />
          <meta
            property="og:image:height"
            content={encodeURIComponent(image?.height || 1052)}
          />
        </>
      ) : null}
      <meta property="og:description" content={description || ''} />
      <meta property="fb:app_id" content={fbAppId} />
    </Fragment>
  )
}
