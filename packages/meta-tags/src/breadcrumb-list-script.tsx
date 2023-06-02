import Head from 'next/head'

import { createScript } from './utils'
import { ListItem } from './types'

export function BreadcrumbListScript(props: { itemListElement: ListItem[] }) {
  const breadcrumbScript = createScript(props, 'BreadcrumbList')

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbScript)}
      </script>
    </Head>
  )
}
