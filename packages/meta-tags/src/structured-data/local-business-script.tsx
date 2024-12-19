import Script from 'next/script'

import { SCHEMA_SCRIPT_TYPE_MAP, createScript } from '../utils'
import { LocalBusinessScriptProps } from '../types'

export function LocalBusinessScript({
  type,
  ...props
}: LocalBusinessScriptProps) {
  const localBusinessScript = createScript(props, SCHEMA_SCRIPT_TYPE_MAP[type])

  return (
    <Script
      id="local-business-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessScript, null, '\t'),
      }}
    />
  )
}
