import { setUserId } from 'firebase/analytics'
import { useCallback } from 'react'

import { getFirebaseAnalytics } from './libs/firebase-analytics'

/**
 * Firebase user ID 설정.
 */
export function useSetFirebaseUserId() {
  return useCallback((userId: string | null) => {
    const firebaseAnalytics = getFirebaseAnalytics()
    if (firebaseAnalytics) {
      setUserId(firebaseAnalytics, userId || '')
    }
  }, [])
}
