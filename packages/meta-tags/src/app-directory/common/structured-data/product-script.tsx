import { createScript } from '../../../utils'
import { ProductScriptProps } from '../../../types'

export function ProductScript(props: ProductScriptProps) {
  const productScript = createScript(props, 'Product')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productScript) }}
    />
  )
}
