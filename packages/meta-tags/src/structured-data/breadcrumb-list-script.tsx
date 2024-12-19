import Script from 'next/script'

import { createScript } from '../utils'
import { BreadcrumbListScriptProps } from '../types'

export function BreadcrumbListScript(props: BreadcrumbListScriptProps) {
  const breadcrumbScript = createScript(props, 'BreadcrumbList')

  return (
    <Script
      id="breadcrumb-list-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbScript, null, '\t'),
      }}
    />
  )
}
