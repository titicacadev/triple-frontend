'use client'

import { ComponentProps } from 'react'
import { useParams } from 'next/navigation'
import { Trans as OriginalTrans } from 'react-i18next'

import { initializeI18n, i18nInstance } from './server'
import { FALLBACK_LANGUAGE, LANGUAGES } from './constants'
import { Language, Namespace } from './types'

export function Trans(
  props: ComponentProps<typeof OriginalTrans> & {
    namespace: Namespace
  },
) {
  const { children, namespace, ...rest } = props

  return (
    <OriginalTrans i18n={i18nInstance} t={useTranslation(namespace)} {...rest}>
      {children}
    </OriginalTrans>
  )
}

export function useCurrentLanguage() {
  const { lang } = useParams()

  return LANGUAGES.includes(lang) ? (lang as Language) : FALLBACK_LANGUAGE
}

export function getTranslation({
  lang,
  namespace,
}: {
  lang: Language
  namespace: Namespace
}) {
  initializeI18n()
  return i18nInstance.getFixedT(lang, namespace)
}

export function useTranslation(namespace: Namespace) {
  const lang = useCurrentLanguage()
  initializeI18n()
  return i18nInstance.getFixedT(lang, namespace)
}
