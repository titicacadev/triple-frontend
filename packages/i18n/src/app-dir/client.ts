'use client'

import { useParams } from 'next/navigation'

import { initializeI18n, i18nInstance } from './server'
import { FALLBACK_LANGUAGE, LANGUAGES } from './constants'
import { Language } from './types'

export function useCurrentLanguage() {
  const { lang } = useParams()

  return LANGUAGES.includes(lang) ? (lang as Language) : FALLBACK_LANGUAGE
}

export function useTranslation(namespace: string) {
  initializeI18n()
  const lang = useCurrentLanguage()
  return i18nInstance.getFixedT(lang, namespace)
}
