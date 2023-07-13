import { SCHEMA_SCRIPT_TYPE_MAP, createScript } from '../../../utils'
import { LocalBusinessScriptProps } from '../../../types'

/**
 * LocalBusinessScript 컴포넌트의 Next13 app router 버전입니다.
 */
export function LocalBusinessScript({
  type,
  ...props
}: LocalBusinessScriptProps) {
  const localBusinessScript = createScript(props, SCHEMA_SCRIPT_TYPE_MAP[type])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessScript) }}
    />
  )
}
