import Head from 'next/head'

import { createScript } from '../utils'
import { ReviewScriptProps } from '../types'

/**
 * Next13 app router 버전일 경우 '@titicaca/meta-tags/common'의 ReviewScript를 사용하세요.
 */
export function ReviewScript({ reviews }: ReviewScriptProps) {
  const reviewScript = reviews.map((review) => createScript(review, 'Review'))

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(reviewScript)}</script>
    </Head>
  )
}
