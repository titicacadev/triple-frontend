import Head from 'next/head'

import { SCHEMA_SCRIPT_TYPE_MAP, createScript } from '../utils'
import { LocalBusinessScriptProps } from '../types'

export function LocalBusinessScript({
  type,
  ...props
}: LocalBusinessScriptProps) {
  const localBusinessScript = createScript(props, SCHEMA_SCRIPT_TYPE_MAP[type])

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessScript),
        }}
      />
    </Head>
  )
}
