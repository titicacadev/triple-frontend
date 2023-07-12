import { Metadata } from 'next'
import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'

/**
 * FacebookOpenGraphMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function createFacebookOpenGraphMeta({
  title: titleFromProps,
  description: descriptionFromProps,
  canonicalUrl,
  type = 'website',
  locale = 'ko_KR',
  image = {
    url: 'https://assets.triple.guide/images/og-tag-app_download@4x.png',
    width: 260,
    height: 260,
  },
}: {
  title?: string
  description?: string
  canonicalUrl?: string
  type?: OpenGraphType
  locale?: string
  image?: { url: string; width?: number; height?: number }
} = {}): Metadata {
  const title =
    titleFromProps || process.env.NEXT_PUBLIC_DEFAULT_PAGE_TITLE || undefined
  const description =
    descriptionFromProps ||
    process.env.NEXT_PUBLIC_DEFAULT_PAGE_DESCRIPTION ||
    undefined
  const url =
    canonicalUrl || process.env.NEXT_PUBLIC_WEB_URL_BASE
      ? `${process.env.NEXT_PUBLIC_WEB_URL_BASE}/auth-web`
      : undefined

  return {
    openGraph: {
      title,
      description,
      url,
      type,
      locale,
      images: [image],
    },
  }
}
