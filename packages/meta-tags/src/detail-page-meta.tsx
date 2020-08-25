import React, { Fragment } from 'react'

export function DetailPageMeta({
  ogTitle,
  description,
  contentUrl,
  ogImage,
  appUrlScheme,
}: {
  ogTitle?: string
  description?: string
  contentUrl: string
  ogImage?: {
    url: string
    width?: number
    height?: number
  }
  appUrlScheme: string
}) {
  return (
    <Fragment>
      <meta
        property="og:title"
        content={ogTitle || '실시간 여행 가이드 - 트리플'}
      />
      <meta property="og:description" content={description || ''} />
      <meta property="og:url" content={contentUrl} />

      <meta
        property="al:android:url"
        content={`${appUrlScheme}:///outlink?url=${encodeURIComponent(
          `${contentUrl}?_triple_no_navbar&_triple_swipe_to_close`,
        )}`}
      />
      <meta
        property="al:ios:url"
        content={`${appUrlScheme}:///outlink?url=${encodeURIComponent(
          `${contentUrl}?_triple_no_navbar&_triple_swipe_to_close`,
        )}`}
      />

      <meta property="og:type" content="article" />
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
      <meta property="og:locale" content="ko_kr" />
    </Fragment>
  )
}
