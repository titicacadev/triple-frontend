import { useRef } from 'react'

export interface TransitionModalRef {
  deepLink?: string
  onActionClick?: () => void
}

export function useTransitionModalRef() {
  return useRef<TransitionModalRef>({})
}
