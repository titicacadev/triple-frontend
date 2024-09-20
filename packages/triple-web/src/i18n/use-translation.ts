import { interpolate, locales } from '@titicaca/i18n'

import { useI18n } from './use-i18n'

const translations: Record<string, Record<string, string>> = {
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

  const t = (key: string, values = {}) => {
    const translation = translations[i18n.locale][key] || key
    return interpolate(translation, values)
  }

  return t
}
