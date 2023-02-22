import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

export function FacebookOpenGraphMeta({
  title = '나를 아는 여행앱, 트리플',
  description = '예약부터 일정까지 여행이 더 쉬워집니다',
  canonicalUrl,
  type = 'website',
  locale = 'ko_KR',
  image = {
    url: 'https://assets.triple.guide/images/og-tag-app_download@4x.png',
    width: 1052,
    height: 1052,
  },
}: {
  title?: string
  description?: string
  canonicalUrl: string
  type?: string
  locale?: string
  image?: { url: string; width?: number; height?: number }
}) {
  const { facebookAppId } = useEnv()

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
