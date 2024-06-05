import { PropsWithChildren } from 'react'

import {
  LoginCtaModalContext,
  type LoginCtaModalContextValue,
} from '../modal/login-cta-modal-context'

export type LoginCtaModalProviderProps =
  PropsWithChildren<LoginCtaModalContextValue>

export function LoginCtaModalProvider({
  children,
  showOptions,
}: LoginCtaModalProviderProps) {
  return (
    <LoginCtaModalContext.Provider value={{ showOptions }}>
      {children}
    </LoginCtaModalContext.Provider>
  )
}
