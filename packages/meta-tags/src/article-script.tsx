import Head from 'next/head'

import { addSchemaType, filterValidValue, toISOString } from './utils'
import { Author, Publisher } from './types'

interface ArticleScriptProps {
  headline: string
  image?: string[]
  datePublished?: string
  dateModified?: string
  author?: Author[]
  publisher?: Publisher[]
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
    author: authors?.map((author) =>
      addSchemaType(filterValidValue(author), 'Person'),
    ),
  })

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(articleScript)}
      </script>
    </Head>
  )
}
