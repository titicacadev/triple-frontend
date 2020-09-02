import React, { Fragment } from 'react'

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
    <Fragment>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={image?.url} />
      {image?.width && image?.height ? (
        <>
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
        </>
      ) : null}
      <meta property="og:description" content={description} />
      <meta property="fb:app_id" content={fbAppId} />
    </Fragment>
  )
}
