import { useCallback } from 'react'

import { LoginCtaModalRef } from '../../contexts'

import { useModal } from './use-modal'

type OpenOptions = LoginCtaModalRef

export function useLoginCtaModal() {
  const { loginCtaModalRef } = useModal()

  const open = useCallback(
    (options?: OpenOptions) => {
      // TODO: push login cta hash

      if (options) {
        loginCtaModalRef.current = options
      }
    },
    [loginCtaModalRef],
  )

  const close = useCallback(() => {
    // TODO: pop login cta hash

    loginCtaModalRef.current = {}
  }, [loginCtaModalRef])

  return {
    open,
    close,
  }
}
