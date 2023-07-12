import { Metadata } from 'next'

export function createEssentialContentMeta({
  title,
  description,
  canonicalUrl,
}: {
  title?: string
  description?: string
  canonicalUrl?: string
}): Metadata {
  return {
    title: title || process.env.NEXT_PUBLIC_DEFAULT_PAGE_TITLE || '',
    description:
      description || process.env.NEXT_PUBLIC_DEFAULT_PAGE_DESCRIPTION || '',
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
