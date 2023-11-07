import { useCallback } from 'react'

import { LoginCtaModalRef, useLoginCtaModalRef } from '../../refs'

type OpenOptions = LoginCtaModalRef

export function useLoginCtaModal() {
  const ref = useLoginCtaModalRef()

  const open = useCallback(
    (options?: OpenOptions) => {
      // TODO: push login cta hash

      if (options) {
        ref.current = options
      }
    },
    [ref],
  )

  const close = useCallback(() => {
    // TODO: pop login cta hash

    ref.current = {}
  }, [ref])

  return {
    open,
    close,
  }
}
