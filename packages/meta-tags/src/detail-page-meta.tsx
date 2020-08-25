import React, { Fragment } from 'react'
import getConfig from 'next/config'

const { APP_URL_SCHEME } = getConfig().publicRuntimeConfig

export function DetailPageMeta({
  ogTitle,
  description,
  contentUrl,
  previewImageUrl,
}: {
  ogTitle?: string
  description?: string
  contentUrl: string
  previewImageUrl: string
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
        content={`${APP_URL_SCHEME}:///outlink?url=${encodeURIComponent(
          `${contentUrl}?_triple_no_navbar&_triple_swipe_to_close`,
        )}`}
      />
      <meta
        property="al:ios:url"
        content={`${APP_URL_SCHEME}:///outlink?url=${encodeURIComponent(
          `${contentUrl}?_triple_no_navbar&_triple_swipe_to_close`,
        )}`}
      />

      <meta property="og:type" content="article" />
      <meta
        property="og:image"
        content={
          previewImageUrl ||
          'https://assets.triple.guide/images/default-cover-image.jpg'
        }
      />
      {previewImageUrl ? null : (
        <>
          <meta property="og:image:width" content="1052" />
          <meta property="og:image:height" content="1052" />
        </>
      )}
      <meta property="og:locale" content="ko_kr" />
    </Fragment>
  )
}
