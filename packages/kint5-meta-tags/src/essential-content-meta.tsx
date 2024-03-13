import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

/**
 * next13 app router를 사용할 경우 '@titicaca/meta-tags/common'의 generateEssentialContentMeta를 사용해주세요
 */
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
