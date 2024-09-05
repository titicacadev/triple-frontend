'use client'

import { createContext } from 'react'

import type { LoginCtaModalRef } from './types'

export interface LoginCtaModalContextValue {
  showOptions?: LoginCtaModalRef
}

export const LoginCtaModalContext = createContext<
  LoginCtaModalContextValue | undefined
>(undefined)
