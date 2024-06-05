import { createContext } from 'react'

import type { AppInstallCtaModalRef } from './types'

export const AppInstallCtaModalContext = createContext<
  AppInstallCtaModalRef | undefined
>(undefined)
