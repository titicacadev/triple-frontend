'use client'

import { PropsWithChildren, createContext, useEffect } from 'react'
import { i18n as I18nInstance } from 'i18next'

export interface I18nValue {
  i18n?: I18nInstance
  lang?: string
}

export const I18nContext = createContext<I18nValue | undefined>(undefined)

type I18nProviderProps = PropsWithChildren & I18nValue

export function I18nProvider({ children, i18n, lang }: I18nProviderProps) {
  useEffect(() => {
    if (i18n?.resolvedLanguage !== lang) {
      i18n?.changeLanguage(lang)
    }
  }, [i18n, lang])

  return children
}
