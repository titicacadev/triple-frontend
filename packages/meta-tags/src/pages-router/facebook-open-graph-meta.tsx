import Head from 'next/head'
import { useEnv } from '@titicaca/triple-web'

import { DEFAULT_OG_IMAGE } from '../constants'

export function FacebookOpenGraphMeta({
  title: titleFromProps,
  description: descriptionFromProps,
  canonicalUrl,
  type = 'website',
  locale = 'ko_KR',
  image = DEFAULT_OG_IMAGE,
}: {
  title?: string
  description?: string
  canonicalUrl: string
  type?: string
  locale?: string
  image?: { url: string; width?: number; height?: number }
}) {
  const { facebookAppId, defaultPageTitle, defaultPageDescription } = useEnv()

  const title = titleFromProps || defaultPageTitle
  const description = descriptionFromProps || defaultPageDescription

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
      <meta key="fb-app-id" property="fb:app_id" content={facebookAppId} />
    </Head>
  )
}
