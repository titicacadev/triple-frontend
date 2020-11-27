import React, { useMemo } from 'react'
import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

export function FacebookOpenGraphMeta({
  title = '실시간 여행 가이드 - 트리플',
  description = '',
  canonicalUrl,
  type = 'website',
  locale = 'ko_KR',
  image = {
    url: 'https://assets.triple.guide/images/default-cover-image.jpg',
    width: 1052,
    height: 1052,
  },
  fbAppId: fbAppIdFromProps,
}: {
  title?: string
  description?: string
  canonicalUrl: string
  type?: string
  locale?: string
  image?: { url: string; width?: number; height?: number }
  /**
   * @deprecated env context를 사용하세요.
   */
  fbAppId?: string
}) {
  const { facebookAppId: fbAppIdFromContext } = useEnv()

  const fbAppId = useMemo(() => {
    if (fbAppIdFromContext) {
      return fbAppIdFromContext
    }
    if (typeof fbAppIdFromProps === 'string') {
      // TODO: 개발용 logger 만들기
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          'fbAppId prop은 deprecate되었습니다.\n다음 메이저 버전부터 env context를 사용해야 합니다.\nhttps://github.com/titicacadev/triple-frontend/blob/ab1648a7cdb684ee2752eb5b80eed02940106964/packages/react-contexts/src/env-context/README.md#%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%98%EB%8A%94-%EB%B2%95',
        )
      }

      return fbAppIdFromProps
    }

    return '136540730081853'
  }, [fbAppIdFromContext, fbAppIdFromProps])

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
