import Head from 'next/head'

import { createScript } from '../utils'
import { ProductScriptProps } from '../types'

/**
 * Next13 app router 버전일 경우 '@titicaca/meta-tags/common'의 ProductScript를 사용하세요.
 */
export function ProductScript(props: ProductScriptProps) {
  const productScript = createScript(props, 'Product')

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(productScript)}
      </script>
    </Head>
  )
}
