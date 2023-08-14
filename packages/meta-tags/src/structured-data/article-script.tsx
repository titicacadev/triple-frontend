import Head from 'next/head'

import { createScript } from '../utils'
import { ArticleScriptProps } from '../types'

/**
 * Next13 app router 버전일 경우 '@titicaca/meta-tags/common'의 ArticleScript를 사용하세요.
 */
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
