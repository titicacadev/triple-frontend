import Head from 'next/head'

export interface BreadcrumbListItem {
  position: number
  name: string
  item?: string
}

export function BreadcrumbListScript({
  breadcrumbList,
}: {
  breadcrumbList: BreadcrumbListItem[][]
}) {
  const breadcrumbScript = breadcrumbList.map((breadcrumb) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((breadcrumbListItem) => ({
      '@type': 'ListItem',
      ...breadcrumbListItem,
    })),
  }))

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbScript, null, '\t')}
      </script>
    </Head>
  )
}
