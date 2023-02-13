import Head from 'next/head'

export interface ArticleAuthor {
  type?: 'Person' | 'Organization'
  name: string
  url?: string
}

export interface ArticlePublisher {
  name: string
}

export interface ArticleScript {
  headline: string
  image?: string[]
  datePublished?: string
  dateModified?: string
  author?: ArticleAuthor[]
  publisher?: ArticlePublisher[]
}

export function BreadcrumbListScript({
  articleInfo,
}: {
  articleInfo: ArticleScript
}) {
  const articleScript = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    ...articleInfo,
    ...(articleInfo.author && {
      author: articleInfo.author.map((author) => ({
        '@type': author.type || 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
      })),
    }),
  }

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(articleScript, null, '\t')}
      </script>
    </Head>
  )
}
