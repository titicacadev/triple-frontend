'use client'

import { PropsWithChildren, createContext, useEffect } from 'react'

import { I18nValue } from '../types'

export const I18nContext = createContext<I18nValue | undefined>(undefined)

export type I18nProviderProps = PropsWithChildren & I18nValue

export function I18nProvider({ children, i18n, lang }: I18nProviderProps) {
  if (typeof window === 'undefined' && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    if (i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [i18n, lang])

  return children
}