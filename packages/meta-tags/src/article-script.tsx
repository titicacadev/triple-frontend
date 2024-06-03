import Head from 'next/head'

import { createScript } from './utils'
import { ArticleScriptProps } from './types'

export function ArticleScript(props: ArticleScriptProps) {
  const articleScript = createScript(props, 'Article')

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(articleScript)}
      </script>
    </Head>
  )
}
