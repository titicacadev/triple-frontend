import { Metadata } from 'next'
import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'

import { DEFAULT_OG_IMAGE } from '../constants'

export function generateFacebookOpenGraphMeta({
  title: titleFromProps,
  description: descriptionFromProps,
  canonicalUrl,
  type = 'website',
  locale = 'ko_KR',
  image = DEFAULT_OG_IMAGE,
}: {
  title?: string
  description?: string
  canonicalUrl?: string
  type?: OpenGraphType
  locale?: string
  image?: { url: string; width?: number; height?: number }
} = {}): Metadata {
  const title = titleFromProps || process.env.NEXT_PUBLIC_DEFAULT_PAGE_TITLE
  const description =
    descriptionFromProps || process.env.NEXT_PUBLIC_DEFAULT_PAGE_DESCRIPTION
  const url =
    canonicalUrl ||
    (process.env.NEXT_PUBLIC_WEB_URL_BASE
      ? `${process.env.NEXT_PUBLIC_WEB_URL_BASE}/auth-web`
      : undefined)

  return {
    openGraph: {
      title,
      description,
      url,
      type,
      locale,
      images: image,
    },
  }
}
