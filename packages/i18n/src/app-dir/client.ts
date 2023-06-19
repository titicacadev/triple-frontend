'use client'

import { useParams } from 'next/navigation'
import i18next from 'i18next'

import { FALLBACK_LANGUAGE, LANGUAGES } from './constants'
import { Language } from './types'

export function useCurrentLanguage() {
  const { lang } = useParams()

  return LANGUAGES.includes(lang) ? (lang as Language) : FALLBACK_LANGUAGE
}

export function useTranslation(namespace: string) {
  const lang = useCurrentLanguage()
  return i18next.getFixedT(lang, namespace)
}
