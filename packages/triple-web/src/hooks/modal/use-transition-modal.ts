import { useCallback } from 'react'

import { TransitionModalRef } from '../../contexts'

import { useModal } from './use-modal'

type OpenOptions = TransitionModalRef

export function useTransitionModal() {
  const { transitionModalRef } = useModal()

  const open = useCallback(
    (options?: OpenOptions) => {
      // TODO: push transition hash

      if (options) {
        transitionModalRef.current = options
      }
    },
    [transitionModalRef],
  )

  const close = useCallback(() => {
    // TODO: pop transition hash

    transitionModalRef.current = {}
  }, [transitionModalRef])

  return {
    open,
    close,
  }
}
