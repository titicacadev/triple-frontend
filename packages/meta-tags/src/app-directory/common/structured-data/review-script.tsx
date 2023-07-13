import { createScript } from '../../../utils'
import { ReviewScriptProps } from '../../../types'

export function ReviewScript({ reviews }: ReviewScriptProps) {
  const reviewScript = reviews.map((review) => createScript(review, 'Review'))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewScript) }}
    />
  )
}
