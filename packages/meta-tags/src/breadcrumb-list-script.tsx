import Head from 'next/head'

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
    itemListElement: breadcrumbList.map((breadcrumbListItem) => ({
      '@type': 'ListItem',
      ...breadcrumbListItem,
    })),
  }))

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbScript)}
      </script>
    </Head>
  )
}
