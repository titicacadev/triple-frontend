import { interpolate } from '@titicaca/i18n'
import en from '@titicaca/i18n/lib/locales/en'
import ko from '@titicaca/i18n/lib/locales/ko'
import ja from '@titicaca/i18n/lib/locales/ja'
import zhTw from '@titicaca/i18n/lib/locales/zh-TW'

import { useI18n } from './use-i18n'

const translations: Record<string, Record<string, string>> = {
  en,
  ko,
  ja,
  'zh-TW': zhTw,
}

export function useTranslation() {
  const i18n = useI18n()

  const t = (key: string, values = {}) => {
    const translation = translations[i18n.locale][key] || key
    return interpolate(translation, values)
  }

  return { t }
}
