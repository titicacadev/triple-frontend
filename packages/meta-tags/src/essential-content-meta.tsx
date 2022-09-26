import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

export function EssentialContentMeta({
  title: titleFromProps,
  description: descriptionFromProps,
  canonicalUrl,
}: {
  title?: string
  description?: string
  canonicalUrl?: string
}) {
  const { defaultPageTitle, defaultPageDescription } = useEnv()

  const title = titleFromProps || defaultPageTitle
  const description = descriptionFromProps || defaultPageDescription

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} />

      {canonicalUrl ? (
        <link key="canonical-url" rel="canonical" href={canonicalUrl} />
      ) : null}
    </Head>
  )
}
