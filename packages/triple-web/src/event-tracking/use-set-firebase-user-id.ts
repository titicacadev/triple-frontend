import { setUserId } from 'firebase/analytics'
import { useCallback } from 'react'

import { firebaseAnalytics } from './libs/firebase-analytics'

export function useSetFirebaseUserId() {
  return useCallback((userId: string | null) => {
    if (firebaseAnalytics) {
      setUserId(firebaseAnalytics, userId || '')
    }
  }, [])
}
