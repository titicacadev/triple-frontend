import Script from 'next/script'

import { createScript } from '../utils'
import { QaPageScriptProps } from '../types'

export function QaPageScript(props: QaPageScriptProps) {
  const qaPageScript = createScript(props, 'QAPage')

  return (
    <Script
      id="qa-page-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(qaPageScript, null, '\t'),
      }}
    />
  )
}
