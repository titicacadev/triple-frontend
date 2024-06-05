import { createContext } from 'react'

import type { AppInstallCtaModalRef } from './types'

export interface AppInstallCtaModalContextValue {
  showOptions?: AppInstallCtaModalRef
}

export const AppInstallCtaModalContext = createContext<
  AppInstallCtaModalContextValue | undefined
>(undefined)
