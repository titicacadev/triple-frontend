import { useContext } from 'react'

import { Context } from './my-reviews-context'

export default function useMyReviewsContext() {
  return useContext(Context)
}
