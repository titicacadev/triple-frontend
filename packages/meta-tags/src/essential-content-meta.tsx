import React from 'react'
import Head from 'next/head'

export function EssentialContentMeta({
  title = '실시간 여행 가이드 - 트리플',
  description = '',
  canonicalUrl = 'https://triple.guide/',
}: {
  title?: string
  description?: string
  canonicalUrl?: string
}) {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} />
      <link key="canonical-url" rel="canonical" href={canonicalUrl} />
    </Head>
  )
}
