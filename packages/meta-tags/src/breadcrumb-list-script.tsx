import Head from 'next/head'

import { addSchemaType } from './utils'

interface BreadcrumbListItem {
  position: number
  name: string
  item?: string
}

export function BreadcrumbListScript({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbListItem[][]
}) {
  const breadcrumbScript = breadcrumbs.map((breadcrumbList) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList.map((breadcrumbListItem) =>
      addSchemaType(breadcrumbListItem, 'ListItem'),
    ),
  }))

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbScript)}
      </script>
    </Head>
  )
}
