import Head from 'next/head'

import { createScript } from '../utils'
import { BreadcrumbListScriptProps } from '../types'

export function BreadcrumbListScript(props: BreadcrumbListScriptProps) {
  const breadcrumbScript = createScript(props, 'BreadcrumbList')

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbScript) }}
      />
    </Head>
  )
}
