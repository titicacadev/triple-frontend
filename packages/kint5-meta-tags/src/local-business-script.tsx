import Head from 'next/head'

import { SCHEMA_SCRIPT_TYPE_MAP, createScript } from './utils'
import { LocalBusinessScriptProps } from './types'

/**
 * Next13 app router 버전일 경우 '@titicaca/meta-tags/common'의 LocalBusinessScript를 사용하세요.
 */
export function LocalBusinessScript({
  type,
  ...props
}: LocalBusinessScriptProps) {
  const localBusinessScript = createScript(props, SCHEMA_SCRIPT_TYPE_MAP[type])

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessScript)}
      </script>
    </Head>
  )
}
