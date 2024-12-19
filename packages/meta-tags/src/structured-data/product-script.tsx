import Script from 'next/script'

import { createScript } from '../utils'
import { ProductScriptProps } from '../types'

export function ProductScript(props: ProductScriptProps) {
  const productScript = createScript(props, 'Product')

  return (
    <Script
      id="product-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productScript, null, '\t'),
      }}
    />
  )
}
