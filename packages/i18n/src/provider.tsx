import React from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18next'

export default function I18nProvider(
  props: { language?: string } & Omit<
    Parameters<typeof I18nextProvider>,
    'i18n'
  >,
) {
  const i18nInstance = isServer() ? i18n.cloneInstance() : i18n

  i18nInstance.changeLanguage(props.language || 'ko')

  return <I18nextProvider {...props} i18n={i18nInstance} defaultNS="common" />
}

function isServer() {
  return typeof window === 'undefined'
}
