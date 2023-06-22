import { ComponentProps, PropsWithChildren } from 'react'
import { createInstance } from 'i18next'
import { Trans as OriginalTrans } from 'react-i18next/TransWithoutContext'

import { Language } from './types'
import { getOptions } from './configs'

export let i18nInstance = createInstance()

type Layout<T> = (props: PropsWithChildren<T>) => JSX.Element

export function Trans(
  props: ComponentProps<typeof OriginalTrans> & {
    namespace: string
  },
) {
  const { children, namespace, ...rest } = props

  return (
    <OriginalTrans i18n={i18nInstance} t={useTranslation(namespace)} {...rest}>
      {children}
    </OriginalTrans>
  )
}

export function appWithTranslation<T extends { params: { lang: Language } }>(
  rootLayout: Layout<T>,
) {
  return (props: Parameters<Layout<T>>[0]) => {
    const {
      params: { lang },
    } = props

    initializeI18n({ lang })
    return rootLayout(props)
  }
}

export function initializeI18n({ lang }: { lang?: Language } = {}) {
  if (i18nInstance.isInitialized) {
    if (lang === undefined) {
      return
    }

    i18nInstance = i18nInstance.cloneInstance({
      ...getOptions({ lang }),
    })
    return
  }

  i18nInstance.init({ ...getOptions() })
}

export function getTranslation({
  lang,
  namespace,
}: {
  lang: Language
  namespace: string
}) {
  initializeI18n()
  return i18nInstance.getFixedT(lang, namespace)
}

export function useTranslation(namespace: string) {
  initializeI18n()
  return i18nInstance.getFixedT(null, namespace)
}
