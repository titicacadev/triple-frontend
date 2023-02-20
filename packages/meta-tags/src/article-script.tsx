import Head from 'next/head'

import { filterValidValue } from './utils'

interface ArticleScriptProps {
  headline: string
  image?: string[]
  datePublished?: Date
  dateModified?: Date
  author?: ArticleAuthor[]
  publisher?: ArticlePublisher[]
}

interface ArticleAuthor {
  type?: 'Person' | 'Organization'
  name: string
  url?: string
}

interface ArticlePublisher {
  name: string
}

export function ArticleScript({
  headline,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
}: ArticleScriptProps) {
  const articleScript = filterValidValue({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    image,
    datePublished: datePublished ? datePublished.toISOString() : undefined,
    dateModified: dateModified ? dateModified.toISOString() : undefined,
    publisher,
    author:
      author?.map((author) =>
        filterValidValue({
          '@type': author.type || 'Person',
          ...author,
          type: undefined,
        }),
      ) || undefined,
  })

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(articleScript)}
      </script>
    </Head>
  )
}
