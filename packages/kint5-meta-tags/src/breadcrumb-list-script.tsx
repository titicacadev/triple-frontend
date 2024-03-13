import Head from 'next/head'

import { createScript } from './utils'
import { BreadcrumbListScriptProps } from './types'

/**
 * Next13 app router 버전일 경우 '@titicaca/meta-tags/common'의 BreadcrumbListScript를 사용하세요.
 */
export function BreadcrumbListScript(props: BreadcrumbListScriptProps) {
  const breadcrumbScript = createScript(props, 'BreadcrumbList')

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbScript)}
      </script>
    </Head>
  )
}
