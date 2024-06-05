import { createContext } from 'react'

import type { LoginCtaModalRef } from './types'

export const LoginCtaModalContext = createContext<LoginCtaModalRef | undefined>(
  undefined,
)
