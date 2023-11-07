import { useCallback } from 'react'

import { TransitionModalRef, useTransitionModalRef } from '../../refs'

type OpenOptions = TransitionModalRef

export function useTransitionModal() {
  const ref = useTransitionModalRef()

  const open = useCallback(
    (options: OpenOptions) => {
      // TODO: push transition hash

      if (options) {
        ref.current = options
      }
    },
    [ref],
  )

  const close = useCallback(() => {
    // TODO: pop transition hash

    ref.current = {}
  }, [ref])

  return {
    open,
    close,
  }
}
