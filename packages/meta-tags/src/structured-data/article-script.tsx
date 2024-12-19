import Script from 'next/script'

import { createScript } from '../utils'
import { ArticleScriptProps } from '../types'

export function ArticleScript(props: ArticleScriptProps) {
  const articleScript = createScript(props, 'Article')

  return (
    <Script
      id="article-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleScript, null, '\t'),
      }}
    />
  )
}
