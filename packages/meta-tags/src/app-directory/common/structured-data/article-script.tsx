import { createScript } from '../../../utils'
import { ArticleScriptProps } from '../../../types'

/**
 * ArticleScript 컴포넌트의 Next13 app router 버전입니다.
 */
export function ArticleScript(props: ArticleScriptProps) {
  const articleScript = createScript(props, 'Article')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleScript) }}
    />
  )
}
