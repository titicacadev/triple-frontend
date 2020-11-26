import React from 'react'
import Head from 'next/head'
import { useEnv } from '@titicaca/react-contexts'

export function EssentialContentMeta({
  title: titleFromProps,
  description: descriptionFromProps,
  canonicalUrl = 'https://triple.guide/',
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
      <link key="canonical-url" rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
