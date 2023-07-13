import { createScript } from '../../../utils'
import { BreadcrumbListScriptProps } from '../../../types'

/**
 * BreadcrumbListScript 컴포넌트의 Next13 app router 버전입니다.
 */
export function BreadcrumbListScript(props: BreadcrumbListScriptProps) {
  const breadcrumbScript = createScript(props, 'BreadcrumbList')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbScript) }}
    />
  )
}
