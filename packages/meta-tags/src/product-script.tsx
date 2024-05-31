import Head from 'next/head.js'

import { createScript } from './utils'
import { ProductScriptProps } from './types'

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
