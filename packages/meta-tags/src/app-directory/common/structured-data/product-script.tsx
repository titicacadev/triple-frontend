import { createScript } from '../../../utils'
import { ProductScriptProps } from '../../../types'

/**
 * ProductScript 컴포넌트의 Next13 app router 버전입니다.
 */
export function ProductScript(props: ProductScriptProps) {
  const productScript = createScript(props, 'Product')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productScript) }}
    />
  )
}
