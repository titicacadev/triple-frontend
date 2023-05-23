import Head from 'next/head'

import { filterValidValue } from './utils'

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
  author,
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

function toISOString(dateString: string | undefined) {
  if (!dateString) {
    return
  }

  const date = new Date(dateString)
  const isValidDate = date instanceof Date && !isNaN(date.getTime())

  return isValidDate ? date.toISOString() : undefined
}
