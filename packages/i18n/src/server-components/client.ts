/* !!! 사용하는 곳에서 'use client' 선언 필요 !!! */

import i18next from 'i18next'
import {
  initReactI18next,
  useTranslation as originalUseTranslation,
} from 'react-i18next'

import { I18nConfigParams, getOptions } from './settings'

i18next.use(initReactI18next).init({
  ...getOptions(),
  lng: undefined,
  detection: {
    order: ['path', 'cookie'],
    lookupCookie: 'LANGUAGE',
  },
})

export function useTranslation({ lang, namespace }: I18nConfigParams) {
  if (i18next.resolvedLanguage !== lang) {
    i18next.changeLanguage(lang)
  }

  return originalUseTranslation(namespace)
}
