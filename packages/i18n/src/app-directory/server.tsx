import { ComponentProps } from 'react'
import { headers } from 'next/headers'
import { createInstance } from 'i18next'
import { Trans as OriginalTrans } from 'react-i18next/TransWithoutContext'

import { Language, Namespace } from './types'
import { getOptions } from './configs'
import { CUSTOM_LANG_HEADER, FALLBACK_LANGUAGE, LANGUAGES } from './constants'

export const i18nInstance = createInstance()

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

export function initializeI18n() {
  if (i18nInstance.isInitialized) {
    return
  }

  i18nInstance.init({ ...getOptions() })
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

export function useCurrentLanguage() {
  const headersList = headers()
  const langFromHeader = headersList.get(CUSTOM_LANG_HEADER)
  const lang = LANGUAGES.includes(langFromHeader ?? '')
    ? langFromHeader
    : FALLBACK_LANGUAGE

  return lang as Language
}
