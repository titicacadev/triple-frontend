import { useTranslation } from 'react-i18next'

export default function useI18n(namespaces = 'common') {
  const { t, ready, i18n } = useTranslation(namespaces, { useSuspense: false })

  if (ready) {
    return {
      t: (key: string, fallback: string) => t([key, fallback]),
      i18n,
    }
  } else {
    return {
      t: (key: string, fallback: string) => fallback,
      i18n,
    }
  }
}
