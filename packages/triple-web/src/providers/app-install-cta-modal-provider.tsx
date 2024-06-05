import { PropsWithChildren } from 'react'

import { AppInstallCtaModalContext } from '../modal/app-install-cta-modal-context'
import type { AppInstallCtaModalRef } from '../modal/types'

export type AppInstallCtaModalProviderProps =
  PropsWithChildren<AppInstallCtaModalRef>

export function AppInstallCtaModalProvider({
  children,
  ...props
}: AppInstallCtaModalProviderProps) {
  return (
    <AppInstallCtaModalContext.Provider value={props}>
      {children}
    </AppInstallCtaModalContext.Provider>
  )
}
