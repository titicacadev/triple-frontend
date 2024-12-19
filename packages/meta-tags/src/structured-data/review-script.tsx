import Script from 'next/script'

import { createScript } from '../utils'
import { ReviewScriptProps } from '../types'

export function ReviewScript({ reviews }: ReviewScriptProps) {
  const reviewScript = reviews.map((review) => createScript(review, 'Review'))

  return (
    <Script
      id="review-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewScript, null, '\t'),
      }}
    />
  )
}
