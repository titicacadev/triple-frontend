import { useTranslation } from 'react-i18next'

export default function useI18n(namespaces = 'common') {
  const { t, ready } = useTranslation(namespaces, { useSuspense: false })

  if (ready) {
    return {
      t: (key: string, fallback: string) => t([key, fallback]),
    }
  } else {
    return {
      t: (key: string, fallback: string) => fallback,
    }
  }
}
