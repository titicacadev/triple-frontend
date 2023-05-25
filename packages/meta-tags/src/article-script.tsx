import Head from 'next/head'

import { addSchemaType, filterValidValue, toISOString } from './utils'

interface ArticleScriptProps {
  headline: string
  image?: string[]
  datePublished?: string
  dateModified?: string
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
  author: authors,
  publisher,
}: ArticleScriptProps) {
  const articleScript = filterValidValue({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    image,
    datePublished: toISOString(datePublished),
    dateModified: toISOString(dateModified),
    publisher,
    author:
      authors?.map((author) =>
        addSchemaType(filterValidValue(author), 'Person'),
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
