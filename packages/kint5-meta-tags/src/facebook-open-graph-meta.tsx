import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

import {
  DEFAULT_PAGE_DESCRIPTION,
  OG_LOCALE,
  DEFAULT_OG_IMAGE,
} from './constants'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 generateFacebookOpenGraphMeta룰 사용해주세요
 */
export function FacebookOpenGraphMeta({
  title: titleFromProps,
  description: descriptionFromProps,
  canonicalUrl,
  type = 'website',
  lang = 'ja',
  image: imageProp,
}: {
  title?: string
  description?: string
  canonicalUrl: string
  type?: string
  lang?: 'ja' | 'ko' | 'en' | 'zh-TW'
  image?: { url: string; width?: number; height?: number }
}) {
  const { facebookAppId } = useEnv()

  const title = titleFromProps || 'TRIPLE Korea'
  const description = descriptionFromProps || DEFAULT_PAGE_DESCRIPTION[lang]
  const image = imageProp || DEFAULT_OG_IMAGE[lang]

  return (
    <Head>
      <meta key="og-title" property="og:title" content={title} />
      <meta key="og-url" property="og:url" content={canonicalUrl} />
      <meta key="og-type" property="og:type" content={type} />
      <meta key="og-locale" property="og:locale" content={OG_LOCALE[lang]} />
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
