import { PropsWithChildren } from 'react'

import { LoginCtaModalContext } from '../modal/login-cta-modal-context'
import type { LoginCtaModalRef } from '../modal/types'

export type LoginCtaModalProviderProps = PropsWithChildren<LoginCtaModalRef>

export function LoginCtaModalProvider({
  children,
  ...props
}: LoginCtaModalProviderProps) {
  return (
    <LoginCtaModalContext.Provider value={props}>
      {children}
    </LoginCtaModalContext.Provider>
  )
}
