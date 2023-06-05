import Head from 'next/head'

import { createScript } from './utils'
import { ReviewSchema } from './types'

interface ReviewScriptProps {
  reviews: ReviewSchema[]
}

export function ReviewScript({ reviews }: ReviewScriptProps) {
  const reviewScript = reviews.map((review) => createScript(review, 'Review'))

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(reviewScript)}</script>
    </Head>
  )
}
