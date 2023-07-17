import { Metadata } from 'next'

/**
 * EssentialContentMeta 컴포넌트의 Next13 app router 버전 유틸 함수입니다.
 */
export function generateEssentialContentMeta({
  title,
  description,
  canonicalUrl,
}: {
  title?: string
  description?: string
  canonicalUrl?: string
} = {}): Metadata {
  return {
    title: title || process.env.NEXT_PUBLIC_DEFAULT_PAGE_TITLE || '',
    description:
      description || process.env.NEXT_PUBLIC_DEFAULT_PAGE_DESCRIPTION || '',
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
