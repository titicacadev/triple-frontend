import { createInstance } from 'i18next'

import { I18nConfigParams, getOptions } from './settings'

async function initI18next({ lang, namespace }: I18nConfigParams) {
  const i18nInstance = createInstance()
  await i18nInstance.init(getOptions({ lang, namespace }))
  return i18nInstance
}

export async function useTranslation({ lang, namespace }: I18nConfigParams) {
  const i18nextInstance = await initI18next({ lang, namespace })

  return {
    t: i18nextInstance.getFixedT(lang, namespace),
    i18n: i18nextInstance,
  }
}
