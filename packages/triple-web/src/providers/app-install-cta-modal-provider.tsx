import { PropsWithChildren } from 'react'

import {
  AppInstallCtaModalContext,
  type AppInstallCtaModalContextValue,
} from '../modal/app-install-cta-modal-context'

export type AppInstallCtaModalProviderProps =
  PropsWithChildren<AppInstallCtaModalContextValue>

export function AppInstallCtaModalProvider({
  children,
  showOptions,
}: AppInstallCtaModalProviderProps) {
  return (
    <AppInstallCtaModalContext.Provider value={{ showOptions }}>
      {children}
    </AppInstallCtaModalContext.Provider>
  )
}
