import { createScript } from '../../../utils'
import { ReviewScriptProps } from '../../../types'

/**
 * ReviewScript 컴포넌트의 Next13 app router 버전입니다.
 */
export function ReviewScript({ reviews }: ReviewScriptProps) {
  const reviewScript = reviews.map((review) => createScript(review, 'Review'))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewScript) }}
    />
  )
}
