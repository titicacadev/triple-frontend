import { interpolate, locales } from '@titicaca/i18n'

import { useI18n } from './use-i18n'
import { I18nLocale } from './types'

type Key = keyof typeof locales.ko

const translations: Record<I18nLocale, Record<Key, string>> = {
  en: locales.en,
  ja: locales.ja,
  ko: locales.ko,
  'zh-TW': locales.zhTw,
}

/**
 * 번역 함수를 사용합니다.
 */
export function useTranslation() {
  const i18n = useI18n()

  const locale = i18n.locale ?? i18n.defaultLocale

  const t = (key: Key, values = {}) => {
    const translation = translations[locale]?.[key] ?? key
    return interpolate(translation, values)
  }

  return t
}
